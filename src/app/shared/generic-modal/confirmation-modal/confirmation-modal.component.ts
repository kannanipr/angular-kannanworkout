import { Component, Input, OnInit } from '@angular/core';
import { ActionConfigMap, ConfirmationModal } from '../models/modal.models';
import { ModalService } from '../services/modal.service';
import { MODAL_CONSTANTS } from '../models/modal.constant';

declare var $: any;

@Component({
  selector: 'ces-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  public actionConfig: ActionConfigMap;

  public confirmationModalConfig: ConfirmationModal = {
    title: '',
    message: ''
  };

  constructor(private _modalService: ModalService) { }

  ngOnInit(): void {
    this._subscribeModalEvent();
  }

  public showModal(): void {

    $('#confirmationModal').modal('show');

  }

  public hideModal(): void {

    $('#confirmationModal').modal('hide');

  }

  private _subscribeModalEvent(): void{

    this._modalService.modalEvent$.subscribe(obj => {

      this.actionConfig = obj;
      this.confirmationModalConfig = this.actionConfig.config.confirmationModalConfig;

      if (this.actionConfig.config.type === MODAL_CONSTANTS.MODAL_TYPES.CONFIRMATION) {

        this.showModal();

      }

    });

  }

  public triggerAction(actionName: string): void {

    this.actionConfig.action.next({
      name: actionName
    })

  }

}

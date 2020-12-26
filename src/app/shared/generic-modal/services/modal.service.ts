import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActionConfigMap, ModalAction, ModalConfig } from '../models/modal.models';

@Injectable()
export class ModalService {


  public modalEvent$: Subject<ActionConfigMap> = new Subject();

  constructor() { }

  public showModal(config: ModalConfig): Observable<ModalAction> {

    const actionConfigMap: ActionConfigMap = {
      config,
      action: new Subject<ModalAction>()
    };

    this.modalEvent$.next(actionConfigMap);

    return actionConfigMap.action;

  }

}

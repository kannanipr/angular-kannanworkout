import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalWrapperComponent } from './modal-wrapper/modal-wrapper.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { ModalService } from './services/modal.service';



@NgModule({
  declarations: [ModalWrapperComponent, ConfirmationModalComponent],
  imports: [
    CommonModule
  ],
  exports: [ModalWrapperComponent],
  providers: [ModalService]
})
export class GenericModalModule { }

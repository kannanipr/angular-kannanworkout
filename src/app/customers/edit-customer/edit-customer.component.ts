import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faUser, faPhone, faEnvelope, faDownload, faTrash} from '@fortawesome/free-solid-svg-icons';
import { takeWhile } from 'rxjs/operators';
import { Customer } from '../models/customers.model';
import { CustomersCommService } from '../services/customers-comm.service';
import { Observable } from 'rxjs';
import { LoaderEventService } from '@common/services/util/loader-event.service';
import { FileInfo } from '@common/services/communication/communication.model';
import { Attachment } from '@common/models/common.model';
import { FileManagerService } from '@common/services/files/file-manager.service';
import { ModalService } from '@shared/generic-modal/services/modal.service';
import { MODAL_CONSTANTS } from '@shared/generic-modal/models/modal.constant';
import { AuthStateModel, UserAccessData } from 'src/app/auth/models/auth.models';
import { COMMON_CONST } from '@common/constants/common.contant';

@Component({
  selector: 'ces-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedCustomerId: number;

  @Input() authState: AuthStateModel;

  @Output() saveCompleted: EventEmitter<void> = new EventEmitter();

  public icName = faUser;

  public icPhone = faPhone;

  public icEmail = faEnvelope;

  public icDownload = faDownload;

  public icDelete = faTrash;

  public customerForm: FormGroup;

  public enableSave: boolean;

  public isActive = true;

  public selectedCustomer: Customer;

  public tabIndex = 1;

  public attachments: Attachment[] = [];

  public customerUserAccess: UserAccessData;

  constructor(private _fb: FormBuilder,
              private _loaderEventService: LoaderEventService,
              private _customerCommService: CustomersCommService,
              private _fileManager : FileManagerService,
              private _modalService: ModalService) { }


  ngOnDestroy(): void {
    this.isActive = false;
  }

  ngOnInit(): void {
    this._createForm();
    this._listenFormChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.selectedCustomerId) {

      if (this.selectedCustomerId > 0) {

        this._getCustomerDetails();

      } else {

        this.selectedCustomer = null;
        this._updateForm();

      }

      this.tabIndex = 1;

    }
    
    if (changes.authState && this.authState) {

      this.customerUserAccess = this.authState.userAccessData.find(screen => screen.screen_id === COMMON_CONST.SCREENS.CUSTOMER);
      this._checkAndUpdateFormState();
    
    }

  }

  private _createForm(): void {

    this.customerForm = this._fb.group({
      name : ['', Validators.required],
      email : ['', [Validators.email]],
      phone : ['', [Validators.pattern(/^([+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\./0-9]*){8,15}$/)]],
      fax : ['', [Validators.pattern(/^([+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\./0-9]*){8,15}$/)]],
      paymentTerms : [1],
      customerFor : [0],
      contactName : [''],
      contactEmail : ['', [Validators.email]],
      contactPhone : ['', [Validators.pattern(/^([+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\./0-9]*){8,15}$/)]],
      contactFax : ['', [Validators.pattern(/^([+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\./0-9]*){8,15}$/)]],
      billingAddress: this._fb.group({
        line1 : [''],
        line2 : [''],
        line3 : [''],
        line4 : [''],
      }),
      shippingAddress: this._fb.group({
        line1 : [''],
        line2 : [''],
        line3 : [''],
        line4 : [''],
      })
    });

    this._checkAndUpdateFormState();

  }

  private _checkAndUpdateFormState() {

    if ( this.customerForm && (!this.customerUserAccess || this.customerUserAccess.accesslevel_id < COMMON_CONST.ACCESS_LEVELS.MODIFY) ) {

      this.customerForm.disable();

    }

  }

  private _updateForm(): void {

    if (this.customerForm) {

      if (this.selectedCustomer) {

        // this.customerForm.setValue({
        //   name: this.selectedCustomer.cust_name,
        //   email: this.selectedCustomer.email,
        // });

        this.customerForm.get('name').setValue(this.selectedCustomer.cust_name);
        this.customerForm.get('email').setValue(this.selectedCustomer.email);
        this.customerForm.get('phone').setValue(this.selectedCustomer.phone);
        this.customerForm.get('fax').setValue(this.selectedCustomer.fax);
        this.customerForm.get('paymentTerms').setValue(this.selectedCustomer.payment_terms);
        this.customerForm.get('customerFor').setValue(this.selectedCustomer.cust_type);
        this.customerForm.get('contactName').setValue(this.selectedCustomer.contact_name);
        this.customerForm.get('contactEmail').setValue(this.selectedCustomer.contact_email);
        this.customerForm.get('contactPhone').setValue(this.selectedCustomer.contact_phone);
        this.customerForm.get('contactFax').setValue(this.selectedCustomer.contact_fax);
        this.customerForm.get('billingAddress.line1').setValue(this.selectedCustomer.bill_addrline1);
        this.customerForm.get('billingAddress.line2').setValue(this.selectedCustomer.bill_addrline2);
        this.customerForm.get('billingAddress.line3').setValue(this.selectedCustomer.bill_addrline3);
        this.customerForm.get('billingAddress.line4').setValue(this.selectedCustomer.bill_addrline4);
        this.customerForm.get('shippingAddress.line1').setValue(this.selectedCustomer.ship_addrline1);
        this.customerForm.get('shippingAddress.line2').setValue(this.selectedCustomer.ship_addrline2);
        this.customerForm.get('shippingAddress.line3').setValue(this.selectedCustomer.ship_addrline3);
        this.customerForm.get('shippingAddress.line4').setValue(this.selectedCustomer.ship_addrline4);

      } else {

        this.customerForm.reset();

      }

    }
    this.attachments = this.selectedCustomer?.CustAttachments ?? [];

  }

  private _getCustomerDetails(): void {

    if (!this.selectedCustomerId) {

      this.selectedCustomer = null;
      return;

    }

    this._loaderEventService.setLoaderState(true);
    this._customerCommService.getById(this.selectedCustomerId).subscribe(res => {

      this.selectedCustomer = res;
      this._updateForm();
      this._loaderEventService.setLoaderState(false);

    }, error => {

      console.error(error);
      this._loaderEventService.setLoaderState(false);

    });

  }

  private _listenFormChanges(): void {

    this.customerForm.statusChanges.pipe(
      takeWhile(() => this.isActive)
    ).subscribe(() => {

      this.enableSave = (this.customerForm.valid && this.customerForm.dirty);

    });

  }

  public saveCustomer(): void {

    let modalAction$ = this._modalService.showModal({
      type: MODAL_CONSTANTS.MODAL_TYPES.CONFIRMATION,
      confirmationModalConfig: {
        title: 'Save Customer',
        message: `Do you want to save changes?`,
      },
    });

    modalAction$.pipe().subscribe((action) => {

      if (action.name === MODAL_CONSTANTS.ACTIONS.PROCEED) {

        const customerObj: Customer = {
          cust_name : this.customerForm.get('name').value,
          email : this.customerForm.get('email').value,
          phone: this.customerForm.get('phone').value,
          fax: this.customerForm.get('fax').value,
          payment_terms: this.customerForm.get('paymentTerms').value,
          cust_type: this.customerForm.get('customerFor').value,
          contact_name: this.customerForm.get('contactName').value,
          contact_email: this.customerForm.get('contactEmail').value,
          contact_phone: this.customerForm.get('contactPhone').value,
          contact_fax: this.customerForm.get('contactFax').value,
          bill_addrline1: this.customerForm.get('billingAddress.line1').value,
          bill_addrline2: this.customerForm.get('billingAddress.line2').value,
          bill_addrline3: this.customerForm.get('billingAddress.line3').value,
          bill_addrline4: this.customerForm.get('billingAddress.line4').value,
          ship_addrline1: this.customerForm.get('shippingAddress.line1').value,
          ship_addrline2: this.customerForm.get('shippingAddress.line2').value,
          ship_addrline3: this.customerForm.get('shippingAddress.line3').value,
          ship_addrline4: this.customerForm.get('shippingAddress.line4').value,
          CustAttachments: this.attachments
        };
    
        let saveObservable$: Observable<Customer>;
    
        if (this.selectedCustomer) {
    
          saveObservable$ = this._customerCommService.put(this.selectedCustomer.cust_id, customerObj, `Updated customer ${customerObj.cust_name}`);
    
        } else {
    
          saveObservable$ = this._customerCommService.post(customerObj, `Saved new customer ${customerObj.cust_name}`);
    
        }
    
        this._loaderEventService.setLoaderState(true);
        saveObservable$.subscribe(() => {
    
          this._loaderEventService.setLoaderState(false);
          this.saveCompleted.emit();
          if (!this.selectedCustomer) {
    
            this.customerForm.reset();
            this.attachments=[];
          }
    
        }, error => {
    
          console.error(error);
          this._loaderEventService.setLoaderState(false);
    
        });

      }

    });

  }

  public setTabIndex(index: number): void{

    this.tabIndex = index;

  }

  public handleFileInput(files: FileList): void {

    const fileInfo: FileInfo = {
      refType: 1,
      RefId: this.selectedCustomer?.cust_id,
    };

    this._loaderEventService.setLoaderState(true);
    this._customerCommService.uploadFile(files.item(0), fileInfo, 'Uploaded file successfully').subscribe(res => {

      this.attachments.push({
        uniqueId : res.UniqueReferenceId,
        filename : files.item(0).name,
      });

      this._loaderEventService.setLoaderState(false);

    }, error => {

      this._loaderEventService.setLoaderState(false);

    });


  }

  public deleteAttachment(attachment: Attachment): void {

    this._loaderEventService.setLoaderState(true);
    this._customerCommService.deleteFile(attachment, 'Attachment deleted').subscribe(res => {

      this.attachments = this.attachments.filter(file => file.uniqueId !== attachment.uniqueId);

      this._loaderEventService.setLoaderState(false);

    }, error => {

      this._loaderEventService.setLoaderState(false);

    });

  }

  public downloadAttachment(attachment: Attachment): void {

    this._loaderEventService.setLoaderState(true);
    this._customerCommService.downloadFile(attachment, 'Downloading attachment').subscribe(res => {

      this._fileManager.downloadFile(res, attachment.filename);

      this._loaderEventService.setLoaderState(false);

    }, error => {

      this._loaderEventService.setLoaderState(false);

    });

  }

}

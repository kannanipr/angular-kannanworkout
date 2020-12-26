import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { COMMON_CONST } from '@common/constants/common.contant';
import { LoaderEventService } from '@common/services/util/loader-event.service';
import {
  faUsers,
  faPlus,
  faPrint,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { MODAL_CONSTANTS } from '@shared/generic-modal/models/modal.constant';
import { ModalService } from '@shared/generic-modal/services/modal.service';
import { HeaderStateService } from '@shared/header/services/header-state.service';
import { PageData } from '@shared/pagination/models/pagination.model';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeWhile } from 'rxjs/operators';
import { AuthStateModel, UserAccessData } from 'src/app/auth/models/auth.models';
import { Customer, CustomerListFilter } from '../models/customers.model';
import { CustomersCommService } from '../services/customers-comm.service';

@Component({
  selector: 'ces-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit, OnDestroy, OnChanges {
  @Output() selectCustomer: EventEmitter<Customer> = new EventEmitter();

  @Input() showActions = true;

  @Input() authState: AuthStateModel;

  public searchListener$: Subject<any> = new Subject();

  public icCustomers = faUsers;

  public icAddCustomer = faPlus;

  public icPrint = faPrint;

  public icDelete = faTrash;

  public customers: Customer[] = [];

  private _isActive = true;

  public pageData: PageData;

  public filter: CustomerListFilter = {
    pageSize: 5,
  };

  public searchText = '';

  public customerUserAccess: UserAccessData;

  constructor(
    private _customerCommService: CustomersCommService,
    private _loaderEventService: LoaderEventService,
    private _headerStateService: HeaderStateService,
    private _modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getAllCustomer(1);
    this._subscribeSearchListener();
    this._subscribeHeaderState();
  }

  
  ngOnChanges(changes: SimpleChanges): void {

    if (changes.authState && this.authState) {

      this.customerUserAccess = this.authState.userAccessData.find(screen => screen.screen_id === COMMON_CONST.SCREENS.CUSTOMER);
      this.showActions = this.customerUserAccess.accesslevel_id >= COMMON_CONST.ACCESS_LEVELS.MODIFY;

    }

  }

  ngOnDestroy(): void {
    this._isActive = false;
  }

  public getAllCustomer(pageNumber: number): void {
    this._loaderEventService.setLoaderState(true);
    this._customerCommService.get(pageNumber, this.filter).subscribe(
      (res) => {
        this.customers = res.list.map(cus => {
          
          let billAddrList = [cus.bill_addrline1, cus.bill_addrline2, cus.bill_addrline3, cus.bill_addrline4];

          cus.fullBillAddress = billAddrList.filter(adr => adr && adr.trim()).join(', ');
          return cus;

        });
        this.pageData = res as PageData;
        this._loaderEventService.setLoaderState(false);
      },
      (error) => {
        this._loaderEventService.setLoaderState(false);
      }
    );
  }

  public onPageSelect(page: number): void {
    this.getAllCustomer(page);
  }

  public onPageSizeChange(pageSize: number): void {
    this.filter.pageSize = pageSize;
    this.getAllCustomer(1);
  }

  private _subscribeSearchListener(): void {
    this.searchListener$.pipe(debounceTime(1000)).subscribe((ev: any) => {
      this.searchText = ev.target.value;
      this.filter.cust_name = this.searchText;
      // this.filter.email = this.searchText;
      // this.filter.phone = this.searchText;
      // this.filter.contact_name = this.searchText;
      // this.filter.contact_phone = this.searchText;
      // this.filter.contact_email = this.searchText;
      this.getAllCustomer(1);
    });
  }

  private _subscribeHeaderState(): void {
    this._headerStateService
      .onRefresh()
      .pipe(takeWhile(() => this._isActive))
      .subscribe(() => {
        this.filter = {};
        this.searchText = '';
        this.getAllCustomer(1);
      });
  }

  public deleteCustomer(customer: Customer): void {
    let modalAction$ = this._modalService.showModal({
      type: MODAL_CONSTANTS.MODAL_TYPES.CONFIRMATION,
      confirmationModalConfig: {
        title: 'Delete Customer',
        message: `Do you really want to delete customer '${customer.cust_name}'?`,
      },
    });

    modalAction$.pipe(takeWhile(() => this._isActive)).subscribe((action) => {
      if (action.name === MODAL_CONSTANTS.ACTIONS.PROCEED) {
        this._loaderEventService.setLoaderState(true);
        this._customerCommService
          .delete(
            customer.cust_id,
            customer.cust_name + ' deleted successfully'
          )
          .subscribe(
            (res) => {
              this._loaderEventService.setLoaderState(false);
              this.getAllCustomer(this.pageData.pageNumber);
            },
            (error) => {
              this._loaderEventService.setLoaderState(false);
            }
          );
      }
    });
  }
}

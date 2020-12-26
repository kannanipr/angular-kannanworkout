import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { AuthStateService } from '../auth/auth-state.service';
import { AuthStateModel } from '../auth/models/auth.models';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { Customer } from './models/customers.model';

@Component({
  selector: 'ces-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnDestroy {

  @ViewChild(CustomerListComponent) listComponent: CustomerListComponent;

  public selectedCustomerId: number;

  public authState: AuthStateModel;

  private _isActive = true;

  constructor(private _authStateService: AuthStateService) { }

  ngOnInit(): void {
    this._subscribeAuthState();
  }

  ngOnDestroy(): void {
    this._isActive = false;
  }

  private _subscribeAuthState(): void {

    this._authStateService.getAuthState().pipe(takeWhile(() => this._isActive)).subscribe((state) => {

      this.authState = state;

    });

  }

  public onSelectCustomer(customer: Customer): void {

    this.selectedCustomerId = 0;

    if (customer) {

      this.selectedCustomerId = customer.cust_id;

    } else {

      this.selectedCustomerId = 0;

    }

  }

  public onSaveCompleted(): void {

    this.listComponent.getAllCustomer(1);

  }

}

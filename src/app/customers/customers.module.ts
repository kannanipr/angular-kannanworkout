import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { CustomersCommService } from './services/customers-comm.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from '@shared/pagination/pagination.module';


@NgModule({
  declarations: [CustomersComponent, CustomerListComponent, EditCustomerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomersRoutingModule,
    FontAwesomeModule,
    PaginationModule
  ],
  providers: [
    CustomersCommService
  ],
  exports: [
    CustomerListComponent
  ]
})
export class CustomersModule { }

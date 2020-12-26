import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericRestApiService } from '@common/services/communication/generic-rest-api.service';
import { Customer } from '../models/customers.model';
import {APP_CONFIG as CONFIG} from '@config/app.config';
import { SnackbarStateService } from '@shared/snackbar/snackbar-state.service';


@Injectable()
export class CustomersCommService extends GenericRestApiService<Customer> {

  constructor(http: HttpClient,
              snackbarStateService: SnackbarStateService) {

    super(http, CONFIG.BASE_URL + 'api/est/customer', snackbarStateService);

  }
}

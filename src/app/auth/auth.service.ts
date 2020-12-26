import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SnackbarStateService } from '../shared/snackbar/snackbar-state.service';
import { APP_CONFIG as CONFIG } from '../config/app.config';
import { Observable } from 'rxjs';
import { AuthStateModel } from './models/auth.models';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected options = {
    responseType: 'json' as const,
  };

  constructor(protected http: HttpClient,
              protected snackbarStateService: SnackbarStateService) { }

    public get(userName?: string): Observable<AuthStateModel> {

      const url = `${CONFIG.BASE_URL}api/Est/Basedata/${userName}`;

      return this.http.get<AuthStateModel[]>(url, { observe: 'response'} ).pipe(
        map(res => {

          return (res.body && res.body.length) ? res.body[0] : null;

        }),
        catchError(error => {

          console.error(error);
          throw error;

        })
      );

    }

}

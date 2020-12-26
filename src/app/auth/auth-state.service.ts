import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthStateModel } from './models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {

  private _authState$: BehaviorSubject<AuthStateModel>;

  constructor() {

    let curAuthState = {};

    try {

      curAuthState = JSON.parse(sessionStorage.getItem('authState'));
      
    } catch (error) {

      console.warn('authState not available');
      
    }

    this._authState$ = new BehaviorSubject(curAuthState);
  }

  private async _saveAuthState(state: AuthStateModel) {

    sessionStorage.setItem('authState', JSON.stringify(state));

  }

  public setAuthState(state: AuthStateModel): void {

    this._authState$.next({...state});
    this._saveAuthState(state);

  }

  public getAuthState(): Observable<AuthStateModel> {
    return this._authState$.asObservable();
  }

  public getUserId(): string {

    const curState = this._authState$.getValue();

    if (curState && curState.userAccessData && curState.userAccessData.length) {

      return curState.userAccessData[0].user_id.toString();

    }

    return null;

  }

}

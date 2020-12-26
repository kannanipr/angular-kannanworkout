import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStateService } from './auth-state.service';
import { AuthStateModel } from './models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class CanActivateRouteGuard implements CanActivate {
  private _authState: AuthStateModel;

  constructor(private _authStateService: AuthStateService) {
    this._subscribeAuthState();
  }

  private _subscribeAuthState(): void {
    this._authStateService.getAuthState().subscribe((state) => {
      this._authState = state;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._checkCanActivate(next, state);
  }

  private _checkCanActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if (!next.data.screens || !next.data.screens.length) {
      return true;
    }

    if (!this._authState || !this._authState.userAccessData || !this._authState.userAccessData.length) {

      return false;

    }

    return this._authState.userAccessData.some(userData => {

      return next.data.screens.some(screenId => userData.screen_id === screenId && !!userData.accesslevel_id);

    })

  }
}

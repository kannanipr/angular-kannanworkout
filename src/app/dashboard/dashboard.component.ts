import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderEventService } from '@common/services/util/loader-event.service';
import { from, timer } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AuthStateService } from '../auth/auth-state.service';
import { takeWhile } from 'rxjs/operators';
import { AuthStateModel } from '../auth/models/auth.models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ces-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private _isActive = true;

  public authState: AuthStateModel;

  private _userName: string;

  constructor(private _authService: AuthService,
              private _authStateService: AuthStateService,
              private _loaderEventService: LoaderEventService,
              private _route: ActivatedRoute ) { }


  ngOnInit(): void {
    this._subscribeAuthState();
    this._subscribeRouteParams();
  }

  ngOnDestroy(): void {
    this._isActive = false;
  }

  private _subscribeRouteParams(): void {

    this._route.queryParams.subscribe(param => {

      if (param.userName) {

        this._userName = param.userName;
        this._getAuthDetails();

      }

    });

  }

  private _subscribeAuthState(): void {

    this._authStateService.getAuthState().pipe(takeWhile(() => this._isActive)).subscribe((state) => {

      this.authState = state;

    });

  }

  private _getAuthDetails(): void {

    timer(0).subscribe(() => {

      if (!this._userName) {
        return;
      }

      this._loaderEventService.setLoaderState(true);

      this._authService.get(this._userName).subscribe((res) => {

        this._loaderEventService.setLoaderState(false);

        this._authStateService.setAuthState(res);

      }, error => {

        this._loaderEventService.setLoaderState(false);

      });



    });

  }

}

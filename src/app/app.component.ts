import { Component, OnInit } from '@angular/core';
import { filter, map, switchMap, takeWhile } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LoaderEventService } from '@common/services/util/loader-event.service';
import { timer } from 'rxjs';
import { WindowsSizeListenerService } from '@common/services/util/windows-size-listener.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public showMenu = false;

  public breadcrumps: string[] = [];

  public showLoader = false;

  constructor( private _loaderEventService: LoaderEventService,
               private _sizeListener: WindowsSizeListenerService,
               private _route: ActivatedRoute,
               private _router: Router) {}

  ngOnInit(): void {
    this._subscribeRouteData();
    this._subscribeLoaderState();
  }

  private _subscribeRouteData(): void {
    this._router.events
      .pipe(
        filter((routeEvent) => routeEvent instanceof NavigationEnd),
        map(() => this._route),
        map((activatedRoute) => activatedRoute.firstChild),
        takeWhile((firstChild) => !!firstChild),
        switchMap((firstChild) => firstChild.data)
      )
      .subscribe((data) => {
        if (data && data.breadcrumps) {
          this.breadcrumps = data.breadcrumps;
        }
      });
  }

  public onMenuClick(): void {
    this.showMenu = !this.showMenu;
  }

  private _subscribeLoaderState(): void {

    this._loaderEventService.getLoaderState().subscribe(state => {

      timer(0).subscribe(() => {

       this.showLoader = state;

      });


    });

  }
}

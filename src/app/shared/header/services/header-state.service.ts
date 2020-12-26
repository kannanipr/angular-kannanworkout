import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderStateService {

  private _refreshButtonStae$: Subject<void> = new Subject();

  constructor() { }

  public fireRefreshEvent(): void {

    this._refreshButtonStae$.next();

  }

  public onRefresh(): Observable<void> {

    return this._refreshButtonStae$.asObservable();

  }

}

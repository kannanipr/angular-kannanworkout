import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SnackbarData } from './snackbar.model';

@Injectable({
  providedIn: 'root'
})
export class SnackbarStateService {

  private _snackbarState: Subject<SnackbarData> = new Subject();

  constructor() { }

  public getSnackbarState(): Observable<SnackbarData> {

    return this._snackbarState.asObservable();

  }

  public showSnackbar(data: SnackbarData): void {

    this._snackbarState.next(data);

  }

}

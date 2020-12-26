import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderEventService {

  private loaderState$: Subject<boolean> = new Subject();

  constructor() { }

  public getLoaderState(): Observable<boolean> {
    return this.loaderState$.asObservable();
  }

  public setLoaderState(state: boolean): void {
    this.loaderState$.next(state);
  }

}

import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowsSizeListenerService {

  private _sizeState$: BehaviorSubject<WindowSize>;

  constructor() {

    this._sizeState$ = new BehaviorSubject<WindowSize>({
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: window.innerWidth <= 600
    });

    window.addEventListener('resize', async (event) => {
      this.onResize(event);
    })

  }

  public getWindowSizeState(): Observable<WindowSize> {

    return this._sizeState$.asObservable();

  }

  public onResize(event: any): void {

    this._sizeState$.next({
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: window.innerWidth <= 600
    });

  }

}

export interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
}

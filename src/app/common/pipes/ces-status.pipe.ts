import { Pipe, PipeTransform } from '@angular/core';
import { AuthStateService } from 'src/app/auth/auth-state.service';
import { AuthStateModel } from 'src/app/auth/models/auth.models';

@Pipe({
  name: 'commonStatus'
})
export class CesStatusPipe implements PipeTransform {

  public authState: AuthStateModel;

  constructor(private _authStateService: AuthStateService) {

    this._subscribeAuthState();

  }

  private _subscribeAuthState(): void {

    this._authStateService.getAuthState().subscribe((state) => {

      this.authState = state;

    });

  }

  transform(value: string): unknown {

    let status = this.authState?.commonStatus.find(st => st.id === value);

    return status?.name;

  }

}

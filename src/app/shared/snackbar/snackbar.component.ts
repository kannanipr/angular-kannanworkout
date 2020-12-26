import { Component, OnInit } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { SnackbarStateService } from './snackbar-state.service';
import { SnackbarData } from './snackbar.model';

@Component({
  selector: 'ces-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  public showSnackbar = false;

  public snackbarData: SnackbarData = {
    type : "info",
    message : ''
  };

  constructor(private _snackbarStateService: SnackbarStateService) { }

  ngOnInit(): void {

    this._subscribeSnackbarState();

  }

  private _subscribeSnackbarState(): void {

    this._snackbarStateService.getSnackbarState().subscribe(data => {

      this.snackbarData = data;
      this.showSnackbar = true;

      if (data) {

        timer(5000).subscribe(() => {

          this.showSnackbar = false;

        });

      }

    });

  }

}

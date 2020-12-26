import { Component, OnInit, Input } from '@angular/core';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { HeaderStateService } from '../services/header-state.service';

@Component({
  selector: 'ces-ribbon',
  templateUrl: './ribbon.component.html',
  styleUrls: ['./ribbon.component.scss']
})
export class RibbonComponent implements OnInit {

  public refreshIcon = faSync;

  @Input() breadcrumps: string[];

  constructor(private _headerStateService : HeaderStateService) { }

  ngOnInit(): void {
  }

  public onRefreshClick(): void {

    this._headerStateService.fireRefreshEvent();

  }

}

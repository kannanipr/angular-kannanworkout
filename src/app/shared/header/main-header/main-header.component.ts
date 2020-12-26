import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ces-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  public icSignOut = faSignOutAlt;

  public icMenu = faBars;

  @Output() menuClick: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }


}

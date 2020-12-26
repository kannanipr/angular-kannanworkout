import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [SideMenuComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    SideMenuComponent
  ]
})
export class SideMenuModule { }

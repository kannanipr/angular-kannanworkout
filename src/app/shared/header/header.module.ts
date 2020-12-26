import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header/main-header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RibbonComponent } from './ribbon/ribbon.component';



@NgModule({
  declarations: [MainHeaderComponent, RibbonComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    MainHeaderComponent,
    RibbonComponent
  ]
})
export class HeaderModule { }

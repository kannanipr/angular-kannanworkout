import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CesStatusPipe } from './ces-status.pipe';

@NgModule({
  declarations: [ CesStatusPipe],
  imports: [
    CommonModule
  ],
  exports: [ CesStatusPipe]
})
export class CommonPipesModule { }

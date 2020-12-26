import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CesTreeComponent } from './ces-tree.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TreeService } from './services/tree.service';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CesTreeComponent],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [CesTreeComponent],
  providers: [TreeService]
})
export class CesTreeModule { }

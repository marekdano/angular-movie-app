import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details.routing';

@NgModule({
  imports: [
    CommonModule,
    DetailsRoutingModule
  ],
  declarations: [
    DetailsComponent
  ],
  providers: []
})
export class DetailsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrashastRoutingModule } from './prashast-routing.module';
import { PrashastComponent } from './prashast.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PrashastComponent
  ],
  imports: [
    CommonModule,
    PrashastRoutingModule,
    MatTabsModule,
    SharedModule
  ]
})
export class PrashastModule { }

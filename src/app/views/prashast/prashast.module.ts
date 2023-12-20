import { PrashastRoutingModule } from './prashast-routing.module';
import { PrashastComponent } from './prashast.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrashastMericsNumberComponent } from './pages/prashast-merics-number/prashast-merics-number.component';


@NgModule({
  declarations: [
    PrashastComponent,
    PrashastMericsNumberComponent
  ],
  imports: [
    CommonModule,
    PrashastRoutingModule,
    MatTabsModule,
    SharedModule
  ]
})
export class PrashastModule { }

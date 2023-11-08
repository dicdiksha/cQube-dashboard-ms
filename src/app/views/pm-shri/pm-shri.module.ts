import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';

import { PmShriRoutingModule } from './pm-shri-routing.module';
import { PmShriComponent } from './pm-shri.component';
import { ImplementationStatusTabComponent } from './pages/implementation-status-tab/implementation-status-tab.component';
import { ImplementationStatusComponent } from './pages/implementation-status-tab/reports/implementation-status/implementation-status.component';
import { BignumberMetricsComponent } from './pages/implementation-status-tab/reports/bignumber-metrics/bignumber-metrics.component';
import { StateWisePerformanceTabComponent } from './pages/state-wise-performance-tab/state-wise-performance-tab.component';
import { StateWisePerformanceComponent } from './pages/state-wise-performance-tab/reports/state-wise-performance/state-wise-performance.component';

@NgModule({
  declarations: [
    PmShriComponent,
    ImplementationStatusTabComponent,
    ImplementationStatusComponent,
    BignumberMetricsComponent,
    StateWisePerformanceTabComponent,
    StateWisePerformanceComponent
  ],
  imports: [
    CommonModule,
    PmShriRoutingModule,
    MatTabsModule,
    SharedModule
  ]
})
export class PmShriModule { }

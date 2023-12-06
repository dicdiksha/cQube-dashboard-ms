import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NipunBharatRoutingModule } from './nipun-bharat-routing.module';
import { NipunBharatComponent } from './nipun-bharat.component';
import { TextbookStatusTabComponent } from './pages/textbook-status-tab/textbook-status-tab.component';
import { LearningSessionsTabComponent } from './pages/learning-sessions-tab/learning-sessions-tab.component';
import { TextbookStatusComponent } from './pages/textbook-status-tab/reports/textbook-status/textbook-status.component';
import { DashletModule, DataService } from '@project-sunbird/sb-dashlet';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { LearningSessionsComponent } from './pages/learning-sessions-tab/reports/learning-sessions/learning-sessions.component';
import { NipunBharatMetricsComponent } from './pages/textbook-status-tab/reports/nipun-bharat-metrics/nipun-bharat-metrics.component';
import { ModuleWideStatusTabComponent } from './pages/module-wide-status-tab/module-wide-status-tab.component';
import { ModuleWideStatusComponent } from './pages/module-wide-status-tab/reports/module-wide-status/module-wide-status.component';
import { DetailedStatusTabComponent } from './pages/detailed-status-tab/detailed-status-tab.component';
import { DetailedStatusComponent } from './pages/detailed-status-tab/reports/detailed-status/detailed-status.component';



@NgModule({
  declarations: [
    NipunBharatComponent,
    TextbookStatusTabComponent,
    LearningSessionsTabComponent,
    TextbookStatusComponent,
    LearningSessionsComponent,
    NipunBharatMetricsComponent,
    ModuleWideStatusTabComponent,
    ModuleWideStatusComponent,
    DetailedStatusTabComponent,
    DetailedStatusComponent
  ],
  imports: [
    CommonModule,
    NipunBharatRoutingModule,
    DashletModule.forRoot({
      dataService: DataService
  }),
  MatTabsModule,
  SharedModule,
  ]
})
export class NipunBharatModule { }

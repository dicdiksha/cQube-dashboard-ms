import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashletModule, DataService } from '@project-sunbird/sb-dashlet';
import { SchoolManagementRoutingComponent } from './school-management-routing.module';
import { SchoolManagementComponent } from './school-management.component';

@NgModule({
  declarations: [
    SchoolManagementComponent
  ],
  imports: [
    DashletModule.forRoot({
      dataService: DataService
  }),
    CommonModule,
    SchoolManagementRoutingComponent,
    MatTabsModule,
    SharedModule
  ]
})
export class SchoolManagementModule { }

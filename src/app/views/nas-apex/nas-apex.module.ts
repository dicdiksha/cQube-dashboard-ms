import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashletModule, DataService } from '@project-sunbird/sb-dashlet';
import {NasApexRoutingComponent} from './nas-apex-routing.module';
import {NasComponent} from './nas-apex.component';

@NgModule({
declarations: [
    NasComponent,
   ],
imports: [
    DashletModule.forRoot({
        dataService: DataService
    }),
    MatTabsModule,
    SharedModule,
    CommonModule,
    NasApexRoutingComponent
]
})
export class NasApexModule { }

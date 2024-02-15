import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashletModule, DataService } from '@project-sunbird/sb-dashlet';
import {PgiApexRoutingComponent} from './pgi-apex-routing.module';
import {PgiComponent} from './pgi-apex.component';

@NgModule({
declarations: [
    PgiComponent,
   ],
imports: [
    DashletModule.forRoot({
        dataService: DataService
    }),
    MatTabsModule,
    SharedModule,
    CommonModule,
    PgiApexRoutingComponent
]
})
export class PgiApexModule { }

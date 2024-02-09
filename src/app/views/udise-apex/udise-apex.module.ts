import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashletModule, DataService } from '@project-sunbird/sb-dashlet';
import {UdiseApexRoutingComponent} from './udise-apex-routing.module';
import {UdiseComponent} from './udise-apex.component';

@NgModule({
declarations: [
    UdiseComponent,
   ],
imports: [
    DashletModule.forRoot({
        dataService: DataService
    }),
    MatTabsModule,
    SharedModule,
    CommonModule,
    UdiseApexRoutingComponent
]
})
export class UdiseApexModule { }

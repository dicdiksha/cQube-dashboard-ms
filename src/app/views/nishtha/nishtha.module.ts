import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import {NishthaRoutingModule} from './nishtha-routing.module';
import {NishthaComponent} from './nishtha.component';

import {ImplementationStatusTabComponent} from './pages/implementation-status-tab/implementation-status-tab.component';
import {ImplementationStatusComponent} from './pages/implementation-status-tab/reports/implementation-status/implementation-status.component';
import { CourseAndMediumStatusTabComponent } from './pages/course-and-medium-status-tab/course-and-medium-status-tab.component';
import { CourseWiseStatusTabComponent } from './pages/course-wise-status-tab/course-wise-status-tab.component';
import { PotentialBaseTabComponent } from './pages/potential-base-tab/potential-base-tab.component';
import { DistrictWiseStatusTabComponent } from './pages/district-wise-status-tab/district-wise-status-tab.component';
import { CourseAndMediumStatusComponent } from './pages/course-and-medium-status-tab/reports/course-and-medium-status/course-and-medium-status.component';
import { PotentialBaseComponent } from './pages/potential-base-tab/reports/potential-base/potential-base.component';
import { DistrictWiseStatusComponent } from './pages/district-wise-status-tab/reports/district-wise-status/district-wise-status.component';
import { CourseWiseStatusComponent } from './pages/course-wise-status-tab/reports/course-wise-status/course-wise-status.component';
import { PotentialBaseCertificatesComponent } from './pages/potential-base-tab/reports/potential-base-certificates/potential-base-certificates.component';
import { DashletModule, DataService } from '@project-sunbird/sb-dashlet';
import { NishthaBignumberMetricsComponent } from './pages/implementation-status-tab/reports/nishtha-bignumber-metrics/nishtha-bignumber-metrics.component';
import { PotentialBaseNvskComponent } from './pages/potential-base-tab/reports/potential-base-nvsk/potential-base-nvsk.component';
import { MediumOfInstructionTabComponent } from './pages/medium-of-instruction-tab/medium-of-instruction-tab.component';
import { MediumOfInstructionComponent } from './pages/medium-of-instruction-tab/reports/medium-of-instruction/medium-of-instruction.component';

@NgModule({
declarations: [
    NishthaComponent,
    ImplementationStatusTabComponent,CourseAndMediumStatusTabComponent,CourseWiseStatusTabComponent,PotentialBaseTabComponent,DistrictWiseStatusTabComponent,
    ImplementationStatusComponent,CourseAndMediumStatusComponent,PotentialBaseComponent,DistrictWiseStatusComponent,CourseWiseStatusComponent, PotentialBaseCertificatesComponent, NishthaBignumberMetricsComponent, PotentialBaseNvskComponent, MediumOfInstructionTabComponent, MediumOfInstructionComponent
],
imports: [
    DashletModule.forRoot({
        dataService: DataService
    }),
    MatTabsModule,
    SharedModule,
    CommonModule,
    NishthaRoutingModule
]
})
export class NishthaModule { }

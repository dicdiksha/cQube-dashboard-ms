import { MatTooltipModule, MatTooltipDefaultOptions, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslocoCoreModule } from './transloco/transloco.module';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderV2Component } from './components/header-v2/header-v2.component';

export const OtherOptions: MatTooltipDefaultOptions = {
  showDelay: 0,
  hideDelay: 0,
  touchGestures: 'auto',
  position: 'below',
  touchendHideDelay: 0,
  disableTooltipInteractivity: true,
}

const IMPORTS: any[] = [
  FontAwesomeModule
];

const DECLARATIONS = [
  LayoutComponent,
  HeaderComponent,
  SideNavComponent
];

@NgModule({
  declarations: [
    DECLARATIONS,
    FooterComponent,
    HeaderV2Component
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslocoCoreModule,
    NgxSpinnerModule,
    MatTooltipModule,
    IMPORTS
  ],
  providers: [
    {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: OtherOptions}
  ],
  exports: [
    IMPORTS,
    DECLARATIONS
  ]
})
export class CoreModule { }

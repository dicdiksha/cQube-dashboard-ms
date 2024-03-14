import { MatTooltipModule } from '@angular/material/tooltip';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { CqubeLibraryModule } from 'cqube-library';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HomePageComponent } from './views/home-page/home-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MetadataInterceptor } from './core/interceptors/metadata-interceptor/metadata-interceptor.service';
import { JwtInterceptor } from './utilities/jwtInterceptor';
import { AppConfig }  from './app.config';
import { AboutPageComponent } from './views/about-page/about-page.component';
import { ContactPageComponent } from './views/contact-page/contact-page.component';

//Add this function as initiating load method first

function initConfig(config: AppConfig){
  return () => config.load()
}
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AboutPageComponent,
    ContactPageComponent
   
  ],
  imports: [
    NgSelectModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatToolbarModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    CqubeLibraryModule,
    MatTooltipModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MetadataInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    AppConfig ,{ provide: APP_INITIALIZER,multi: true, useFactory: initConfig, deps: [AppConfig]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

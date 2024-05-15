import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {FeatureModule} from "./feature/feature.module";
import {LayoutModule} from "@angular/cdk/layout";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MaterialModule} from "./material/material.module";
import {MatListModule} from "@angular/material/list";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {AuthInterceptor} from "./auth.interceptor";
import {ModalModule} from "ngx-bootstrap/modal";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FeatureModule,
    MatSidenavModule,
    MaterialModule,
    MatListModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

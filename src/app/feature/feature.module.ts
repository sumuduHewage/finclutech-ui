import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class FeatureModule { }

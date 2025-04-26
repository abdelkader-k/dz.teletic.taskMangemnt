import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeveloperRoutingModule } from './developer-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoAngularMaterialModule } from 'src/app/DemoAngularMaterialModule';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DeveloperRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DemoAngularMaterialModule,
  ]
})
export class DeveloperModule { }

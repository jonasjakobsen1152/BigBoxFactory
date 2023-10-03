import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {BoxWindowComponent} from "./box-window/box-window.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HomePage} from "./home/home.page";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, HomePage, BoxWindowComponent],
  imports: [BrowserModule, ReactiveFormsModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

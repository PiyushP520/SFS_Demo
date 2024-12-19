import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './component/header/header.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DeviceComponent } from './component/device/device.component';
import { OrderComponent } from './component/order/order.component';
import { VisualComponent } from './component/visual/visual.component';
import { ProductionstatevisualComponent } from './component/productionstatevisual/productionstatevisual.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    DeviceComponent,
    OrderComponent,
    VisualComponent,
    ProductionstatevisualComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

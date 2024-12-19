import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DeviceComponent } from './component/device/device.component';
import { OrderComponent } from './component/order/order.component';

const routes: Routes = [{
  path: 'dashboard',
  component: DashboardComponent,
},
{
  path: 'device/:id',
  component: DeviceComponent,
  children:[{
    path:'order/:orderId',
    component: OrderComponent
  }]
},
{
  path: '',
  redirectTo:'/dashboard',
  pathMatch:'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component } from '@angular/core';
import { MockService } from 'src/app/services/service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private mockService : MockService){}
  devices:string[]=[];

  ngOnInit(){
    this.mockService.getDevices().subscribe({
      next: (response: any) => {
        this.devices = response.filter((device:string)=>device!="{deviceId}");
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}

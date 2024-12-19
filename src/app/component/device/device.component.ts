import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MockService } from 'src/app/services/service.service';

enum DeviceState {
  Running = "running",
  Stopped = "stopped",
  Maintenance = "maintenance"
}

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent {
  eventSource: EventSource | null = null;
  deviceData: any;
  public DeviceState = DeviceState;
  constructor(private route: ActivatedRoute, private cd: ChangeDetectorRef) { }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
         this.createEventSource(params['id'])
      }
    })
  }

  createEventSource(deviceId: string) {
    this.eventSource = new EventSource(`https://mock-api.assessment.sfsdm.org/events/${deviceId}`);
    this.eventSource.onopen = (event: any) => {
      console.log('Connection to server opened.');
    };

    this.eventSource.onmessage = (event: any) => {
      console.log('New message from server:', event.data);
      try {
        this.deviceData = JSON.parse(event.data);
        this.cd.detectChanges();
        console.log('data:', this.deviceData);
      } catch (error) {
        console.error('Error getting data:', error);
      }
    };

    this.eventSource.onerror = (event: any) => {
      console.error('Error occurred:', event);
      if (event.eventPhase === EventSource.CLOSED) {
        console.log('Connection closed.');
      }
    };
  }

  getCssClass(state: string) {
    switch (state) {
      case DeviceState.Running:
        return 'running';
      case DeviceState.Stopped:
        return 'stopped';
      case DeviceState.Maintenance:
        return 'maintenance';
      default:
        return '';
    }
  }

  ngOnDestroy() {
    this.eventSource?.close();
    // this.subscription?.unsubscribe()
  }
}

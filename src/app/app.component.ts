import { Component } from '@angular/core';
import { MockService } from './services/service.service'

export type Env = {
  environment?: String,
  environmentColour?: String,
  environmentName?: String
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'sfs';
  env: Env = {
    environment: '',
    environmentColour: '',
    environmentName: ''
  };
  constructor(private mockService: MockService) { }

  ngOnInit() {
    this.mockService.getConfig().subscribe({
      next: (response: any) => {
        this.env.environment = response.environment;
        this.env.environmentColour = response.environmentColour;
        this.env.environmentName = response.environmentName;

      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}

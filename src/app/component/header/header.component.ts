import { Component, Input } from '@angular/core';
import { Env } from '../../app.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() env: Env = {};
}

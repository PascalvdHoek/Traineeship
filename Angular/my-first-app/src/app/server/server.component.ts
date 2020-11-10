import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styles: [
    `
      .online {
        color: white;
      }

      .offline {
        backgroundcolor: red;
      }
    `,
  ],
})
export class ServerComponent {
  @Input()
  serverName: string;

  id: number = 10;
  status: 'online' | 'offline' = 'online';
  constructor() {
    this.status = Math.random() > 0.5 ? 'online' : 'offline';
  }
}

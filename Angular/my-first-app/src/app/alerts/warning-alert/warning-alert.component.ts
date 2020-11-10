import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warning-alert',
  templateUrl: './warning-alert.component.html',
  styleUrls: ['./warning-alert.component.scss'],
})
export class WarningAlertComponent implements OnInit {
  warning: string;
  constructor() {
    this.warning = 'Watch out';
  }

  ngOnInit(): void {}
}

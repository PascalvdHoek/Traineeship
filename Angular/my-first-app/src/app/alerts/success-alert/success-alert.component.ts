import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  templateUrl: './success-alert.component.html',
  styles: ['h2{color: green;}'],
})
export class SuccessAlertComponent implements OnInit {
  successMessage: string;

  constructor() {
    this.successMessage = 'Good luck with your next assignment';
  }

  ngOnInit(): void {}
}

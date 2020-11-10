import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-two-way-bind',
  templateUrl: './two-way-bind.component.html',
  styleUrls: ['./two-way-bind.component.scss'],
})
export class TwoWayBindComponent implements OnInit {
  username: string = '';

  constructor() {}

  ngOnInit(): void {}
  resetUsername() {
    this.username = '';
  }
}

import { Component, OnInit } from '@angular/core';
import { Timestamp } from 'rxjs';

@Component({
  selector: 'app-directive-assignement',
  templateUrl: './directive-assignement.component.html',
  styleUrls: ['./directive-assignement.component.scss'],
})
export class DirectiveAssignementComponent implements OnInit {
  visible: boolean;
  log: { visible: boolean; time: Date }[] = [];

  constructor() {
    this.visible = false;
  }

  ngOnInit(): void {}
  toggleVisiblity() {
    this.visible = !this.visible;
    let currentLog = { visible: this.visible, time: new Date() };
    // console.log(currentLog);

    this.log.push(currentLog);
  }
}

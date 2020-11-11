import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  collapsed = true;

  @Output() changePage = new EventEmitter<'recipes' | 'shopping-list'>();
  constructor() {
    this.changePage.emit;
  }

  ngOnInit(): void {}

  onSelect(data: 'recipes' | 'shopping-list') {
    this.changePage.emit(data);
  }
}

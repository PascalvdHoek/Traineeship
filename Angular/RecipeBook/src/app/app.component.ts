import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'RecipeBook';
  currentPage: 'recipes' | 'shopping-list' = 'recipes';

  changePage(data) {
    this.currentPage = data;
  }
}

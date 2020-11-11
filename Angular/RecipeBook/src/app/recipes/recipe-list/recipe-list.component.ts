import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { PANCAKE_URL, BACONEGGS_URL } from '../recipe.images';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipe = new Recipe('Pancakes', 'Very delicious pancakes', PANCAKE_URL);
  recipes: Recipe[] = [
    new Recipe('Pancakes', 'Very delicious pancakes', PANCAKE_URL),
    new Recipe(
      'Bacon and eggs',
      'Very delicious Bacon and eggs',
      BACONEGGS_URL
    ),
  ];
  @Output() onSelectRecipe = new EventEmitter<Recipe>();

  constructor() {}

  ngOnInit(): void {}

  selectRecipe(recipe: Recipe) {
    this.onSelectRecipe.emit(recipe);
  }
}

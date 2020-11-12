import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { PANCAKE_URL, BACONEGGS_URL } from './recipe.images';
import { Recipe } from './recipe.model';
@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('Pancakes', 'Very delicious pancakes', PANCAKE_URL, [
      new Ingredient('flour', 200),
      new Ingredient('eggs', 5),
    ]),
    new Recipe(
      'Bacon and eggs',
      'Very delicious Bacon and eggs',
      BACONEGGS_URL,
      [new Ingredient('eggs', 5), new Ingredient('bacon', 2)]
    ),
  ];

  constructor(private shoppinglistService: ShoppingListService) {}

  getRecipes() {
    return [...this.recipes];
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.shoppinglistService.addIngredients(ingredients);
  }
}

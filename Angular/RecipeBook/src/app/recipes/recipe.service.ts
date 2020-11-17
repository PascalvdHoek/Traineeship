import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { PANCAKE_URL, BACONEGGS_URL } from './recipe.images';
import { Recipe } from './recipe.model';
@Injectable()
export class RecipeService {
  number = 3;
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(0, 'Pancakes', 'Very delicious pancakes', PANCAKE_URL, [
      new Ingredient('flour', 200),
      new Ingredient('eggs', 5),
    ]),
    new Recipe(
      1,
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

  getRecipe(id: number) {
    return this.recipes.find((a) => a.id === id);
  }

  addRecipe(
    name: string,
    description: string,
    imagePath: string,
    ingredients: Ingredient[]
  ) {
    this.recipes.push(
      new Recipe(this.number, name, description, imagePath, ingredients)
    );
    this.number++;
    this.recipeChanged.next([...this.recipes]);
  }

  updateRecipe(newRecipe: Recipe) {
    this.recipes[newRecipe.id] = newRecipe;
    console.log(this.recipes[newRecipe.id]);
    this.recipeChanged.next([...this.recipes]);
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.shoppinglistService.addIngredients(ingredients);
  }
}

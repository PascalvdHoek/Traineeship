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
  private recipes: Recipe[] = [];

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     0,
  //     'Tasty Schnitzel',
  //     'A super-tasty Schnitzel - just awesome!',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
  //   ),
  //   new Recipe(
  //     1,
  //     'Big Fat Burger',
  //     'What else you need to say?',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //     [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
  //   ),
  // ];

  constructor(private shoppinglistService: ShoppingListService) {}

  getRecipes() {
    return [...this.recipes];
  }

  getRecipe(id: number) {
    return this.recipes.find((a) => a.id === id);
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next([...this.recipes]);
  }

  addRecipe(recipe: Recipe) {
    let id = this.recipes.length;
    console.log(recipe.ingredients);
    this.recipes.push(
      new Recipe(
        id,
        recipe.name,
        recipe.description,
        recipe.imagePath,
        recipe.ingredients
      )
    );
    this.recipeChanged.next([...this.recipes]);
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    const recipe = this.recipes.find((recipe) => recipe.id === id);
    const index = this.recipes.indexOf(recipe);
    this.recipes[index] = new Recipe(
      id,
      newRecipe.name,
      newRecipe.description,
      newRecipe.imagePath,
      newRecipe.ingredients
    );
    this.recipeChanged.next([...this.recipes]);
  }

  deleteRecipe(id: number) {
    const recipe = this.recipes.find((recipe) => recipe.id === id);
    const index = this.recipes.indexOf(recipe);
    this.recipes.splice(index, 1);
    this.recipeChanged.next([...this.recipes]);
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.shoppinglistService.addIngredients(ingredients);
  }
}

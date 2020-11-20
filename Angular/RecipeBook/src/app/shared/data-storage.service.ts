import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class DataStorageService {
  private url = 'https://recipe-book-2d40a.firebaseio.com/recipes.json';
  recipes: Recipe[];

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    this.recipes = this.recipeService.getRecipes();
    this.http.put(this.url, this.recipes).pipe(tap(console.log)).subscribe();
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.url).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}

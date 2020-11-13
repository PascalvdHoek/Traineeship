import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  editMode = false;
  constructor(
    private route: ActivatedRoute,
    private recipeSerice: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipe = this.recipeSerice.getRecipe(+params['id']);
      this.editMode = params['id'] != null;
      console.log(this.editMode);
    });
  }
}

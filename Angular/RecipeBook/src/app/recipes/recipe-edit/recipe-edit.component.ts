import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeSerice: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipe = this.recipeSerice.getRecipe(+params['id']);
      this.editMode = params['id'] != null;
      console.log(this.editMode);
      this.initForm();
    });
  }
  onSubmit() {
    console.log(this.recipeForm);
    //update
    if (this.editMode) {
      this.recipeSerice.updateRecipe(
        new Recipe(
          this.recipe.id,
          this.recipeForm.value.name,
          this.recipeForm.value.description,
          this.recipeForm.value.imagePath,
          this.recipeForm.value.ingredients
        )
      );
    } else {
      //Add
      this.recipeSerice.addRecipe(
        this.recipeForm.value.name,
        this.recipeForm.value.description,
        this.recipeForm.value.imagePath,
        this.recipeForm.value.ingredients
      );
    }
  }

  onAddIngredient() {
    let ingredients = (<FormArray>this.recipeForm.get('ingredients')).controls;
    ingredients.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        amount: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  private initForm() {
    let recipeName = '';
    let imagePath = '';
    let description = '';
    let ingredients = new FormArray([]);

    if (this.editMode) {
      recipeName = this.recipe.name;
      imagePath = this.recipe.imagePath;
      description = this.recipe.description;
      if (this.recipe['ingredients']) {
        for (let ingredient of this.recipe.ingredients) {
          ingredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: ingredients,
    });
  }

  getControls() {
    let controls = (<FormArray>this.recipeForm.get('ingredients')).controls;
    return controls;
  }
}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes-resolver.service';
import { RecipesComponent } from './recipes.component';
import { SelectARecipeComponent } from './select-a-recipe.component';

const routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: SelectARecipeComponent },
      {
        path: 'detail/:id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService],
      },
      { path: 'new', component: RecipeEditComponent },
      {
        path: 'edit/:id',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}

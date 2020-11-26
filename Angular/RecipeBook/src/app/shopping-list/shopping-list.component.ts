import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private shoppinglistSubscription: Subscription;
  constructor(
    private shoppingListService: ShoppingListService,
    private loggingService: LoggingService
  ) {}

  ngOnInit(): void {
    this.shoppinglistSubscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
    this.ingredients = this.shoppingListService.getIngredients();
    this.loggingService.printLog('Hello from ShoppingList Component');
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.shoppinglistSubscription.unsubscribe();
  }
}

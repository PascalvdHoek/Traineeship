import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss'],
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) name: ElementRef;
  @ViewChild('amountInput', { static: false }) amount: ElementRef;

  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() {}

  ngOnInit(): void {}

  addIngredient() {
    this.ingredientAdded.emit(
      new Ingredient(
        this.name.nativeElement.value,
        this.amount.nativeElement.value
      )
    );
    this.clearInput();
  }

  clearInput() {
    this.name.nativeElement.value = '';
    this.amount.nativeElement.value = 0;
  }
}

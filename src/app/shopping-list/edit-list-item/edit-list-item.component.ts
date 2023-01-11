import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { ShoppingListService } from 'src/app/services/ShoppingList.service';
import { Ingredients } from 'src/app/shared/ingredients.model';

@Component({
  selector: 'app-edit-list-item',
  templateUrl: './edit-list-item.component.html',
  styleUrls: ['./edit-list-item.component.css'],
})
export class EditListItemComponent implements OnInit, OnDestroy {
  @Output() ingredientAdded = new EventEmitter<Ingredients>();
  shoppingForm: FormGroup;
  subscription: Subscription;
  editMode = false;
  indexOfItemToEdit: number;
  itemToEdit: Ingredients;
  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingForm = new FormGroup({
      item: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    });

    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.indexOfItemToEdit = index;
        this.editMode = true;
        this.itemToEdit = this.slService.getIngredient(index);
        this.shoppingForm.setValue({
          item: this.itemToEdit.name,
          amount: this.itemToEdit.amount,
        });
      }
    );
  }

  addIngredient() {
    console.log(this.shoppingForm.value);
    const ingName = this.shoppingForm.get('item').value;
    const ingAmt = this.shoppingForm.get('amount').value;
    const ingredientData = new Ingredients(ingName, ingAmt);
    if (this.editMode)
      this.slService.updateIngredient(this.indexOfItemToEdit, ingredientData);
    else this.slService.addIngredient(ingredientData);
    this.editMode = false;
    this.shoppingForm.reset();
  }

  clearForm() {
    this.shoppingForm.reset();
    this.editMode = false;
  }

  deleteIngredient() {
    this.slService.deleteIngredient(this.indexOfItemToEdit);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

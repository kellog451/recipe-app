import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';
import { Ingredients } from 'src/app/models/ingredients.model';
import {
  AddIngredient,
  DeleteIngredient,
  StopEditIngredient,
  UpdateIngredient,
} from 'src/app/redux/actions/shopping-list.action';
import { AppState } from 'src/app/redux/store/initial.state';

@Component({
  selector: 'app-edit-list-item',
  templateUrl: './edit-list-item.component.html',
  styleUrls: ['./edit-list-item.component.css'],
})
export class EditListItemComponent implements OnInit, OnDestroy {
  shoppingForm: FormGroup;
  subscription: Subscription;
  editMode = false;
  indexOfItemToEdit: number;
  itemToEdit: Ingredients;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.shoppingForm = new FormGroup({
      item: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    });

    this.subscription = this.store.select('shoppingList').subscribe((state) => {
      if (state.indexOfSelectedIngredient > -1) {
        this.editMode = true;
        this.itemToEdit = state.selectedIngredient;
        this.indexOfItemToEdit = state.indexOfSelectedIngredient;
        console.log('Select', state.selectedIngredient);
        this.shoppingForm.setValue({
          item: state.selectedIngredient.name,
          amount: state.selectedIngredient.amount,
        });
      } else this.editMode = false;
    });
  }

  addIngredient() {
    console.log(this.shoppingForm.value);
    const ingName = this.shoppingForm.get('item').value;
    const ingAmt = this.shoppingForm.get('amount').value;
    const ingredientData = new Ingredients(ingName, ingAmt);
    if (this.editMode)
      this.store.dispatch(new UpdateIngredient(ingredientData));
    else {
      this.store.dispatch(new AddIngredient(ingredientData));
    }
    this.clearForm();
  }

  clearForm() {
    this.shoppingForm.reset();
    this.store.dispatch(new StopEditIngredient());
    this.editMode = false;
  }

  deleteIngredient() {
    this.store.dispatch(new DeleteIngredient());
    this.clearForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

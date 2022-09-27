import { outputAst } from '@angular/compiler';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ingredients } from 'src/app/shared/ingredients.model';

@Component({
  selector: 'app-edit-list-item',
  templateUrl: './edit-list-item.component.html',
  styleUrls: ['./edit-list-item.component.css'],
})
export class EditListItemComponent implements OnInit {
  @ViewChild('nameInput') name: ElementRef;
  @ViewChild('amountInput') amount: ElementRef;
  @Output() ingredientAdded = new EventEmitter<ingredients>();
  constructor() {}

  ngOnInit(): void {}
  addIngredient() {
    console.log(this.name.nativeElement.value);
    console.log(this.amount.nativeElement.value);
    const ingName = this.name.nativeElement.value;
    const ingAmt = this.amount.nativeElement.value;
    const ingredientData = new ingredients(ingName, ingAmt);
    this.ingredientAdded.emit(ingredientData);
  }
}

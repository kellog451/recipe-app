import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EditListItemComponent } from './edit-list-item/edit-list-item.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
  declarations: [ShoppingListComponent, EditListItemComponent],
  exports: [ShoppingListComponent, EditListItemComponent],
  imports: [CommonModule, ReactiveFormsModule, ShoppingListRoutingModule],
})
export class ShoppingListModule {}

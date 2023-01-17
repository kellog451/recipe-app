import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { CardDirectiveDirective } from './card-directive.directive';
import { LoadingSpinnerComponent } from './loading-spinner';

@NgModule({
  declarations: [
    CardDirectiveDirective,
    LoadingSpinnerComponent,
    AlertComponent,
  ],
  exports: [CardDirectiveDirective, LoadingSpinnerComponent, AlertComponent],
  imports: [],
})
export class SharedModule {}

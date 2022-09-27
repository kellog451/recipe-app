import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'recipe-project';
  currentMenu: string = 'recipe';

  getSelectedRoute(route: string) {
    this.currentMenu = route;
  }
}

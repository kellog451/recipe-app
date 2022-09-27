import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() navigate = new EventEmitter<string>();

  constructor() {}

  selectRoute(option) {
    this.navigate.emit(option);
  }

  ngOnInit(): void {}
}

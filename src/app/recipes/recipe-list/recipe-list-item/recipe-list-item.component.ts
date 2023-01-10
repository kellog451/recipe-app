import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.css'],
})
export class RecipeListItemComponent implements OnInit {
  @Input() recipe: {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
  };

  constructor() {}

  ngOnInit(): void {}
}

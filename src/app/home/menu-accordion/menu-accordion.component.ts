import { Component, OnInit } from '@angular/core';
import {MealItemsService} from '../../meal-items.service';
import {MealGroupModel} from '../../meal-group-model';

@Component({
  selector: 'app-menu-accordion',
  templateUrl: './menu-accordion.component.html',
  styleUrls: ['./menu-accordion.component.scss'],
})
export class MenuAccordionComponent implements OnInit {
  private _mealItems: MealGroupModel[] = [];
  private _selected: number[] = [];
// TODO code review this component, needs animation and stuff https://codepen.io/ionic/pen/uJkCz
  groups = [];
  // TODO core review how to sync this with service-held data ?
  shownGroup = null;

  constructor(private mealItemService: MealItemsService) { }

  ngOnInit() {
    this._mealItems = this.mealItemService.getAvailableMeals();
  }
  get mealItems() {
    return this._mealItems;
  }
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }

  isSelected(mealId) {
    return this._selected.findIndex(i => i === mealId);
  }

  toggleMeal(groupName: string, mealId: number) {
    const i = this.isSelected(mealId);
    if (i > -1) {
      this._selected.splice(i, 1);
      this.mealItemService.removeMeal(mealId);
    } else {
      this._selected.push(mealId);
      this.mealItemService.addMeal(groupName, mealId);
    }
  }

  isGroupShown(group) {
    return this.shownGroup === group;
  }
}

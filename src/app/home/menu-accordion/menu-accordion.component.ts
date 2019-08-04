import { Component, OnInit } from '@angular/core';
import {MealItemsService} from '../../meal-items.service';
import {MealGroupModel} from '../../meal-group-model';

@Component({
  selector: 'app-menu-accordion',
  templateUrl: './menu-accordion.component.html',
  styleUrls: ['./menu-accordion.component.scss'],
})
export class MenuAccordionComponent implements OnInit {
// TODO code review this component, needs animation and stuff https://codepen.io/ionic/pen/uJkCz
  groups = [];
  // TODO core review how to sync this with service-held data ?
  mealItems: MealGroupModel[];
  shownGroup = null;

  constructor(private mealItemService: MealItemsService) { }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }

  isGroupShown(group) {
    return this.shownGroup === group;
  }

  ngOnInit() {
    this.mealItems = this.mealItemService.getAvailableMeals();
  }

  addMealToSelected(mealId) {
    this.mealItemService.addSelectedMeal(mealId);
    this.mealItems = this.mealItemService.getAvailableMeals();
    console.log(this.mealItems);
  }
  removeMealFromSelected(mealId) {
    this.mealItemService.removeSelectedMeal(mealId);
    this.mealItems = this.mealItemService.getAvailableMeals();
  }


}

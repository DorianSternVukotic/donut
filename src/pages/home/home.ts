import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { HOME_FIRST, HOME_SECOND } from "../../providers/fakeData";
import { TMealGroup } from "../../interfaces";
import { MealProvider } from "../../providers/meal/meal";
import { CartPage } from "../cart/cart";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  private _mealGroups: TMealGroup[] = [];
  private _selectedMeals: number[] = [];
  // TODO code review this component, needs animation and stuff https://codepen.io/ionic/pen/uJkCz
  groups = [];
  // TODO core review how to sync this with service-held data ?
  // shownGroup = null;
  constructor(
    private _mealsProvider: MealProvider,
    private _nav: NavController
  ) {}

  get firstItems() {
    return HOME_FIRST;
  }
  get secondItems() {
    return HOME_SECOND;
  }
  get mealGroups() {
    return this._mealGroups;
  }

  ngOnInit() {
    this._mealGroups = this._mealsProvider.getAvailableMeals();
  }
  go(where: string) {
    if (where === "cart") {
      this._nav.push(CartPage);
    }
  }
  image(src: string) {
    return { "background-image": `url('${src}');` };
  }

  isSelected(mealId) {
    return this._selectedMeals.findIndex(i => i === mealId);
  }

  toggleMeal(groupName: string, mealId: number) {
    const i = this.isSelected(mealId);
    if (i > -1) {
      this._selectedMeals.splice(i, 1);
      this._mealsProvider.removeMeal(mealId);
    } else {
      this._selectedMeals.push(mealId);
      this._mealsProvider.addMeal(groupName, mealId);
    }
  }
}

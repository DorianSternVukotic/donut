import { Injectable } from "@angular/core";
import { TCart } from "../../interfaces";
import { HOME_MEALS } from "../fakeData";

/*
  Generated class for the MealProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MealProvider {
  private _cart: TCart[] = [];
  // TODO peer review how to sync these values in components that use them ?

  private availableMeals = HOME_MEALS;
  get ids(): TCart[] {
    return this._cart;
  }
  getAvailableMeals() {
    return this.availableMeals;
  }

  set replaceCart(cart: TCart[]) {
    this._cart = cart;
  }

  addMeal(groupName: string, mealId: number) {
    this._cart.push({ groupName, mealId, orderedCount: 1 });
  }
  removeMeal(mealId: number) {
    this._cart = this._cart.filter(i => {
      if (i.mealId === mealId) {
        i.orderedCount = 0;
        return false;
      }
      return true;
    });
  }
  get cart() {
    const store = {};
    this._cart.forEach(({ groupName, mealId, orderedCount }) => {
      const prev = store[groupName] ? store[groupName] : [];
      store[groupName] = prev.concat({ mealId, orderedCount });
    });
    const cart = Object.keys(store).map(key => {
      const meals = (store[key] as Array<any>).map(m => {
        return this.availableMeals
          .find(g => {
            return g.groupName === key;
          })
          .meals.find(i => {
            if (i.id === m.mealId) {
              i.orderedCount = m.orderedCount;
              return true;
            }
            return false;
          });
      });
      return { groupName: key, meals };
    });
    return cart;
  }
  /**
   * gets orderedCount by id from form
   * @param formValues current values of the form
   */
  getTotalSelectedMealsPrice(formValues: { key: string }) {
    let totalPrice = 0;
    this.cart.forEach(mealGroup => {
      mealGroup.meals.forEach(meal => {
        totalPrice += meal.displayPrice * formValues[meal.id];
      });
    });
    return totalPrice;
  }

  getFullPrice() {
    let price = 0;
    const theftRate = 25;
    let fullPrice: {
      base: number;
      VAT: number;
      total: number;
    } = {
      base: 0,
      VAT: 0,
      total: 0
    };
    this.cart.forEach(mealGroup => {
      mealGroup.meals.forEach(meal => {
        price += meal.displayPrice * meal.orderedCount;
      });
    });
    fullPrice.total = price;
    fullPrice.base = price / (1 + theftRate / 100);
    fullPrice.VAT = fullPrice.total - fullPrice.base;

    return fullPrice;
  }
  constructor() {}
}

import { Injectable } from '@angular/core';
import {MealModel} from './meal-model';
import {MealGroupModel} from './meal-group-model';
import {forEach} from '@angular-devkit/schematics';

type TCart = { groupName: string; mealId: number; orderedCount: number };
@Injectable({
  providedIn: 'root'
})
export class MealItemsService {
  private _cart: TCart[] = [];
  // TODO peer review how to sync these values in components that use them ?

  private availableMeals: MealGroupModel[] = [
    {
      groupName: 'Apetizers',
      meals: [
        {
          id: 0,
          name: 'salad',
          displayPrice: 20,
          description: 'Mixed salad',
          image:  'https://ichef.bbci.co.uk/news/660/cpsprodpb/3DAD/production/_104898751_gettyimages-844466808.jpg',
          selected: false,
          orderedCount: 0
        },
        {
          id: 1,
          name: 'sandwich',
          displayPrice: 15,
          description: 'A nice sanwich',
          image: 'https://ichef.bbci.co.uk/news/660/cpsprodpb/3DAD/production/_104898751_gettyimages-844466808.jpg',
          selected: false,
          orderedCount: 0
        }
      ],
    },
    {
      groupName: 'MainCourse',
      meals: [
        {
          id: 3,
          name: 'burger',
          displayPrice: 25,
          description: 'big burger',
          image:  'https://ichef.bbci.co.uk/news/660/cpsprodpb/3DAD/production/_104898751_gettyimages-844466808.jpg',
          selected: false,
          orderedCount: 0
        },
        {
          id: 4,
          name: 'casserole',
          displayPrice: 30,
          description: 'I dont even know what that word means',
          image: 'https://ichef.bbci.co.uk/news/660/cpsprodpb/3DAD/production/_104898751_gettyimages-844466808.jpg',
          selected: false,
          orderedCount: 0
        }
      ]
    }
  ];

  private selectedMeals: MealGroupModel[] = [];

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
    this._cart.push({ groupName, mealId, orderedCount: 1});
  }
  removeMeal(mealId: number) {
    this._cart = this._cart.filter( i => {
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
      store[groupName] = prev.concat({mealId, orderedCount });
    });
    const cart = Object.keys(store).map(key => {
      const meals = (store[key] as Array<any>).map(m => {
        return this.availableMeals.find(g => {
          return g.groupName === key;
        }).meals.find(i => {
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
        totalPrice += (meal.displayPrice * formValues[meal.id]);
      });
    });
    return totalPrice;
  }

  getFullPrice() {
    let price = 0;
    const theftRate = 25;
    let fullPrice: {
      base: number,
      VAT: number,
      total: number
    } = {
      base: 0,
      VAT: 0,
      total: 0
    };
    this.cart.forEach(mealGroup => {
      mealGroup.meals.forEach(meal => {
        price += (meal.displayPrice * meal.orderedCount);
      });
    });
    fullPrice.total = price;
    fullPrice.base = price / (1 + (theftRate / 100));
    fullPrice.VAT = fullPrice.total - fullPrice.base;

    return fullPrice;
  }
  constructor() { }
}

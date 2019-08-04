import { Injectable } from '@angular/core';
import {MealModel} from './meal-model';
import {MealGroupModel} from './meal-group-model';
import {forEach} from '@angular-devkit/schematics';

@Injectable({
  providedIn: 'root'
})
export class MealItemsService {
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
          selected: false
        },
        {
          id: 1,
          name: 'sandwich',
          displayPrice: 15,
          description: 'A nice sanwich',
          image: 'https://ichef.bbci.co.uk/news/660/cpsprodpb/3DAD/production/_104898751_gettyimages-844466808.jpg',
          selected: false
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
          selected: false
        },
        {
          id: 4,
          name: 'casserole',
          displayPrice: 30,
          description: 'I dont even know what that word means',
          image: 'https://ichef.bbci.co.uk/news/660/cpsprodpb/3DAD/production/_104898751_gettyimages-844466808.jpg',
          selected: false
        }
      ]
    }
  ];

  private selectedMeals: MealModel[] = [];

  getAvailableMeals() {
    return this.availableMeals;
  }

  getSelectedMeals() {
    return this.availableMeals;
  }

  addSelectedMeal(mealId: number) {
    let selectedMeal: MealModel;
    this.availableMeals.forEach(mealGroup => {
      const meals = mealGroup.meals;
      meals.forEach(meal => {
        if (meal.id === mealId) {
          meal.selected = true;
          selectedMeal = meal;
        }
      });
    });
    selectedMeal.selected = true;
    this.selectedMeals.push(selectedMeal);
  }

  removeSelectedMeal(mealId: number) {
    console.log('hi');
    console.log(this.selectedMeals);
    this.selectedMeals = this.selectedMeals.filter(meal => {
      // return true if keep, false if drop
      if (meal.id !== mealId) {
        return true;
      } else {
        this.availableMeals.forEach(mealGroup => {
          let targetedMeal = {...mealGroup.meals.find(availableMeal => {
            // targeted meal is badly named because .find will reassign it to undefined if the last group it doesnt find it
            if (availableMeal.id === mealId) {
              availableMeal.selected = false;
              return true;
            }
            return false;
          })};
        });
        return false;
      }
    });
  }
  constructor() { }
}

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

  getAvailableMeals() {
    return this.availableMeals;
  }

  getSelectedMeals() {
    return this.selectedMeals;
  }

  addSelectedMeal(mealId: number) {
    let selectedMeal: MealModel;
    let selectedMealGroup: MealGroupModel;
    this.availableMeals.forEach(mealGroup => {
      const meals = mealGroup.meals;
      meals.forEach(meal => {
        if (meal.id === mealId) {
          meal.selected = true;
          meal.orderedCount = 1;
          selectedMeal = meal;
          selectedMealGroup = mealGroup;
        }
      });
    });
    selectedMeal.selected = true;
    selectedMeal.orderedCount  = 1;
    this.addMealToSelectedMeals(selectedMeal, selectedMealGroup);
  }

  removeSelectedMeal(mealId: number) {
    this.selectedMeals.forEach(selectedMealGroup => {
      selectedMealGroup.meals = selectedMealGroup.meals.filter(meal => {
        // return true if keep, false if drop
        if (meal.id !== mealId) {
          return true;
        } else {
          this.availableMeals.forEach(mealGroup => {
            let targetedAvailableMeal = {...mealGroup.meals.find(availableMeal => {
                // targeted meal is badly named because .find will reassign it to undefined if the last group it doesnt find it
                if (availableMeal.id === mealId) {
                  availableMeal.selected = false;
                  availableMeal.orderedCount = 0;
                  return true;
                }
                return false;
              })};
          });
          meal.orderedCount = 0;
          return false;
        }
      });
    });
    this.selectedMeals = this.selectedMeals.filter(mealGroup => {
      if (mealGroup.meals.length === 0) {
        return false;
      }
      return true;
    });
  }

  private addMealToSelectedMeals(selectedMeal: MealModel, selectedMealGroup: MealGroupModel) {
    const mealGroupName = selectedMealGroup.groupName;
    let isMealGroupFound = false;
    this.selectedMeals.forEach(mealGroup => {
      if (mealGroup.groupName === mealGroupName) {
        mealGroup.meals.push(selectedMeal);
        isMealGroupFound = true;
      }
    });
    if (false === isMealGroupFound) {
      this.selectedMeals.push({
        groupName: mealGroupName,
        meals: [selectedMeal]
      });
    }
  }

  constructor() { }
}

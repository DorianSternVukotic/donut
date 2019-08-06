import { Component, OnInit } from '@angular/core';
import {MealItemsService} from '../meal-items.service';
import {MealGroupModel} from '../meal-group-model';
import {FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {type} from 'os';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  selectedMeals: MealGroupModel[];
  cartForm: FormGroup;
  constructor(private mealItemsService: MealItemsService,
              private fb: FormBuilder) { }

  get totalPrice() {
    return this.mealItemsService.getTotalSelectedMealsPrice();
  }
  get cart() {
    return this.mealItemsService.cart;
  }

  ngOnInit() {
    this.cartForm = this.fb.group({
      countOrdered: this.fb.array([])
    });
    // TODO this does NOT sync if we go back, add more stuff and go to cart again
    this.cart.forEach(mealGroup => {
      mealGroup.meals.forEach(meal => {
        if (typeof this.cartFormArray[meal.id] === 'undefined') {
          const count = this.fb.group({
            countNumber: []
          });
          this.cartFormArray.insert(meal.id, count);
          console.log('added to cartForm');
        }
      });
    });
    console.log(this.cartFormArray);
    /**this.addCount();
    this.addCount();
    this.addCount();
    this.addCount();
    this.addCount();
    this.addCount();
    this.addCount();
    console.log(this.cartFormArray);*/
    this.cartForm.valueChanges.subscribe(console.log);
    // this.selectedMeals = this.mealItemsService.getSelectedMeals();
    // this.totalPrice = this.mealItemsService.getTotalSelectedMealsPrice();
  }

  get cartFormArray() {
    return this.cartForm.get('countOrdered') as FormArray;
  }

  addCount() {
    const count = this.fb.group({
      countNumber: []
    });
    this.cartFormArray.push(count);
  }
  deleteCount(i) {
    this.cartFormArray.removeAt(i);
  }
}

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
    return this.mealItemsService.getTotalSelectedMealsPrice(this.cartForm.value);
  }
  get cart() {
    return this.mealItemsService.cart;
  }

  ngOnInit() {
    const ids = {};
    this.mealItemsService.ids.forEach(({ mealId, orderedCount }) => (ids[mealId] = [orderedCount]));
    this.cartForm = this.fb.group(ids);
  }
  /**
   * Gets called when page leaves view
   */
  ionViewWillLeave() {
    const { value } = this.cartForm;
    const cart = this.mealItemsService.ids
      .map(({ mealId, groupName }) => ({ groupName, mealId, orderedCount: value[mealId] }));
    this.mealItemsService.replaceCart = cart;
  }
}

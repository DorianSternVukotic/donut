import { Component, OnInit } from '@angular/core';
import {MealItemsService} from '../meal-items.service';
import {MealGroupModel} from '../meal-group-model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  selectedMeals: MealGroupModel[];
  constructor(private mealItemsService: MealItemsService) { }

  get totalPrice() {
    return this.mealItemsService.getTotalSelectedMealsPrice();
  }
  get cart() {
    console.log(this.mealItemsService.cart);
    return this.mealItemsService.cart;
  }
  
  ngOnInit() {
    // this.selectedMeals = this.mealItemsService.getSelectedMeals();
    // this.totalPrice = this.mealItemsService.getTotalSelectedMealsPrice();
  }

}

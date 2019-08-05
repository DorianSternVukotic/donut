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
  totalPrice: number;
  constructor(private mealItemsService: MealItemsService) { }

  getTotalPrice() {
    return this.mealItemsService.getTotalSelectedMealsPrice();
  }
  get cart() {
    return this.mealItemsService.cart;
  }
  
  ngOnInit() {
    // this.selectedMeals = this.mealItemsService.getSelectedMeals();
    // this.totalPrice = this.mealItemsService.getTotalSelectedMealsPrice();
  }

}

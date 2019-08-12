import { Component, OnInit } from '@angular/core';
import {EventServiceService} from '../event-service.service';
import {MealItemsService} from '../meal-items.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  constructor(private eventService: EventServiceService,
              private mealItemsService: MealItemsService) {

  }
  get event() {
    return this.eventService;
  }

  get mealItems() {
    return this.mealItemsService;
  }

  ngOnInit() {
  }

}

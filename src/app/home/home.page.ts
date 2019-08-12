import { Component } from '@angular/core';
import {OrderService} from '../order.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private orderService: OrderService) {}

}

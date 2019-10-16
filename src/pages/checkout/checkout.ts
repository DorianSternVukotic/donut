import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { MealProvider } from "../../providers/meal/meal";
import { TMealGroup, TMeal } from "../../interfaces";
import {HomePage} from "../home/home";
import { OrderProvider } from "../../providers/order/order";

/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

type Params = {
  people: string;
  tents: string;
  waiters: string;
  note: string;
  fullName: string;
  email: string;
  phone: string;
  selectedDate: Date;
  totalPrice: number;
};
@IonicPage()
@Component({
  selector: "page-checkout",
  templateUrl: "checkout.html"
})
export class CheckoutPage {
  data: Params = {
    people: "",
    tents: "",
    waiters: "",
    note: "",
    fullName: "",
    email: "",
    phone: "",
    selectedDate: new Date(),
    totalPrice: 0
  };
  cart: TMealGroup[] = [];
  constructor(
    private _nav: NavController,
    private _params: NavParams,
    private _mealsProvider: MealProvider,
    private _orderProvider: OrderProvider
  ) {}
  get tax() {
    return this.data.totalPrice * 0.25;
  }
  decimals(str: string) {
    return str ? parseInt(str).toFixed(2) : "0.00";
  }
  goBack = () => this._nav.pop();
  getMealText = ({ name, orderedCount }: TMeal) => `${orderedCount} x ${name}`;
  getEventText(which: "people" | "tents" | "waiters") {
    let msg = "Uzvanika";
    if (which === "tents") {
      msg = "Šatora";
    }
    if (which === "waiters") {
      msg = "Konobara";
    }
    return `${this.data[which]} x ${msg}`;
  }

  confirmOrderRequest(){
    this._orderProvider.isOrderConfirmed = true;
    this._nav.push(HomePage);
  }
  ionViewWillEnter() {
    this.cart = this._mealsProvider.cart;
    this.data = this._params.data;
  }
}

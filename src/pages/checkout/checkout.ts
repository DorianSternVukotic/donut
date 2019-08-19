import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { MealProvider } from "../../providers/meal/meal";
import { TMealGroup, TMeal } from "../../interfaces";

/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-checkout",
  templateUrl: "checkout.html"
})
export class CheckoutPage {
  _date = Date.now();
  totalPrice = 0;
  cart: TMealGroup[] = [];
  constructor(
    private _nav: NavController,
    private _params: NavParams,
    private _mealsProvider: MealProvider
  ) {}
  get date() {
    return this._date;
  }
  get tax() {
    return this.totalPrice * 0.25;
  }
  decimals(str: string) {
    return str ? parseInt(str).toFixed(2) : "0.00";
  }
  goBack = () => this._nav.pop();
  getMealText = ({ name, orderedCount }: TMeal) => `${orderedCount} x ${name}`;
  ionViewWillEnter() {
    this.cart = this._mealsProvider.cart;
    this.totalPrice = this._params.get("totalPrice") || 0;
  }
}

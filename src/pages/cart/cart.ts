import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MealProvider } from "../../providers/meal/meal";
import { TMealGroup } from "../../interfaces";
import { EventsPage } from "../events/events";

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-cart",
  templateUrl: "cart.html"
})
export class CartPage {
  cartForm: FormGroup;
  cart: TMealGroup[] = [];
  constructor(
    private _nav: NavController,
    private _builder: FormBuilder,
    private _mealsProvider: MealProvider
  ) {}
  get totalPrice() {
    return this._mealsProvider.getTotalSelectedMealsPrice(this.cartForm.value);
  }
  go() {
    this._nav.push(EventsPage, { totalPrice: this.totalPrice });
  }
  decimals(str: string) {
    return str ? parseInt(str).toFixed(2) : "0.00";
  }
  ionViewWillLoad() {
    const ids = {};
    this._mealsProvider.ids.forEach(
      ({ mealId, orderedCount }) => (ids[mealId] = [orderedCount])
    );
    this.cartForm = this._builder.group(ids);
  }
  ionViewWillEnter() {
    this.cart = this._mealsProvider.cart;
  }
  /**
   * Gets called when page leaves view
   */
  ionViewWillLeave() {
    const { value } = this.cartForm;
    const cart = this._mealsProvider.ids.map(({ mealId, groupName }) => ({
      groupName,
      mealId,
      orderedCount: value[mealId]
    }));
    this._mealsProvider.replaceCart = cart;
  }
  goBack = () => this._nav.pop();
}

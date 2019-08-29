import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormBuilder, FormGroup } from "@angular/forms";
import { CheckoutPage } from "../checkout/checkout";

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-events",
  templateUrl: "events.html"
})
export class EventsPage {
  selectedDate = new Date();
  eventForm: FormGroup;
  constructor(
    private _nav: NavController,
    private _params: NavParams,
    private _builder: FormBuilder
  ) {}
  /**
   * Only runs once, same as putting it inside the constructor
   */
  ionViewWillLoad() {
    /**
     * The array sets the default value, they are strings because all inputs
     * no matter the type return strings
     */
    this.eventForm = this._builder.group({
      people: ["1"],
      tents: ["1"],
      waiters: ["1"],
      note: [""],
      fullName: [""],
      email: [""],
      phone: [""]
    });
  }

  go() {
    const totalPrice = this._params.get("totalPrice");
    this._nav.push(CheckoutPage, {
      ...this.eventForm.value,
      totalPrice,
      selectedDate: this.selectedDate
    });
  }

  goBack = () => this._nav.pop();
}

import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { MealProvider } from "../../providers/meal/meal";
import { TMealGroup, TMeal } from "../../interfaces";
import {HomePage} from "../home/home";
import { OrderProvider } from "../../providers/order/order";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/catch';

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
  private isOrderPending;
  cart: TMealGroup[] = [];
  constructor(
    private _nav: NavController,
    private _params: NavParams,
    private _mealsProvider: MealProvider,
    private _orderProvider: OrderProvider,
    private http: HttpClient,
  ) {}
  get tax() {
    return this.data.totalPrice * 0.25;
  }
  message;
  get postMessage(){
    return this.message;
  }
  decimals(str: string) {
    return str ? parseInt(str).toFixed(2) : "0.00";
  }
  goBack = () => this._nav.pop();
  getMealText = ({ name, orderedCount }: TMeal) => `${orderedCount} x ${name}`;
  getmealTotalPrice = (meal) => {return meal.orderedCount * meal.displayPrice;};
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

    this.isOrderPending = true;
    let postFormData = new FormData();
    postFormData.append('email', this.data.email);
    postFormData.append('phone', this.data.phone);
    postFormData.append('personName', this.data.fullName);
    postFormData.append('numWaiters', this.data.waiters);
    postFormData.append('numPeople', this.data.people);
    postFormData.append('numTents', this.data.tents);
    postFormData.append('date', this.data.selectedDate.getDate() + '-' + this.data.selectedDate.getMonth() + '-' + this.data.selectedDate.getFullYear());
    postFormData.append('note', this.data.note);
    postFormData.append('approximatePrice', this.data.totalPrice.toString());

    let i = 0;
    this.cart.forEach(group=>{
      group.meals.forEach(meal => {
        postFormData.append('meals['+i+'][id]', meal.id.toString());
        postFormData.append('meals['+i+'][amount]', meal.orderedCount.toString());
      })
    });
    try {
      let postRequest = this.http.post('http://staging.catering-a.com/API/Narudzba/Create', postFormData, {responseType: 'text'});
      postRequest.subscribe(response => {
        //lol deadline
        if(response == 'Order created and mail sent'){
          this.isOrderPending = false;
          this._orderProvider.isOrderConfirmed = true;
          this._nav.push(HomePage);
        }
        else{
          this.isOrderPending = false;
          this.message = "Nešto je pošlo po krivu."
        }
      },
        error => {
          this.isOrderPending = false;
          this.message = "Nešto je pošlo po krivu.";
          console.log(error);
        });
    } catch (e) {
      this.isOrderPending = false;
      this.message = "Nešto je pošlo po krivu.";
      console.log(e);
    }
  }
  ionViewWillEnter() {
    this.cart = this._mealsProvider.cart;
    this.data = this._params.data;
  }
}

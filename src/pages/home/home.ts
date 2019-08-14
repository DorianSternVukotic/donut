import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { HOME_FIRST, HOME_SECOND } from "../../providers/fakeData";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(public navCtrl: NavController) {}

  get firstItems() {
    return HOME_FIRST;
  }
  get secondItems() {
    return HOME_SECOND;
  }
}

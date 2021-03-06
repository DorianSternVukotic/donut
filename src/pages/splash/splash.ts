import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { HomePage } from "../home/home";

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-splash",
  templateUrl: "splash.html"
})
export class SplashPage {
  constructor(private _nav: NavController) {}

  skip() {
    this._nav.setRoot(HomePage);
  }
}

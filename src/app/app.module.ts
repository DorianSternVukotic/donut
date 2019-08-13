import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { MealProvider } from "../providers/meal/meal";
import { EventsProvider } from "../providers/events/events";
import { SplashPageModule } from "../pages/splash/splash.module";
import { CartPageModule } from "../pages/cart/cart.module";
import { CheckoutPageModule } from "../pages/checkout/checkout.module";

@NgModule({
  declarations: [MyApp, HomePage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SplashPageModule,
    CartPageModule,
    CheckoutPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MealProvider,
    EventsProvider
  ]
})
export class AppModule {}

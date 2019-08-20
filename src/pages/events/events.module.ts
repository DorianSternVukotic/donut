import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { EventsPage } from "./events";
import { MatDatepickerModule, MatNativeDateModule } from "@angular/material";

@NgModule({
  declarations: [EventsPage],
  imports: [
    IonicPageModule.forChild(EventsPage),
    MatNativeDateModule,
    MatDatepickerModule
  ]
})
export class EventsPageModule {}

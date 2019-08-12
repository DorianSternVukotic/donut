import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventPage } from './event.page';

import { DatePickerModule } from 'ionic4-date-picker';

const routes: Routes = [
  {
    path: '',
    component: EventPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        DatePickerModule
    ],
  declarations: [EventPage]
})
export class EventPageModule {}

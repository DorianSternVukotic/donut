import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import {HighligtedItemComponent} from './highligted-item/highligted-item.component';
import {MenuAccordionComponent} from './menu-accordion/menu-accordion.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
    declarations: [HomePage, HighligtedItemComponent, MenuAccordionComponent]
})
export class HomePageModule {}

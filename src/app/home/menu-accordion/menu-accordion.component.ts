import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-accordion',
  templateUrl: './menu-accordion.component.html',
  styleUrls: ['./menu-accordion.component.scss'],
})
export class MenuAccordionComponent implements OnInit {
// TODO code review this component, needs animation and stuff https://codepen.io/ionic/pen/uJkCz
  groups = [];
  shownGroup = null;

  constructor() { }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }

  isGroupShown(group) {
    return this.shownGroup === group;
  }

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this.groups[i] = {
        name: i,
        items: []
      };
      for (let j = 0; j < 3; j++) {
        this.groups[i].items.push(i + '-' + j);
      }
    }
  }

}

import { Component, Input } from "@angular/core";

/**
 * Generated class for the AccordionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "accordion",
  templateUrl: "accordion.html"
})
export class AccordionComponent {
  isOpen = false;
  @Input() length: number = 1;
  @Input() title: string = "";
  constructor() {}

  get height() {
    return `${this.length * 120}px`;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EventServiceService} from '../event-service.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  eventForm: FormGroup;
  pageLoaded = false;
  constructor(private fb: FormBuilder,
              private eventService: EventServiceService) {
  }

  ngOnInit() {
    this.eventForm = this.fb.group({
      peopleCount: 1,
      tentCount: 1,
      waiterCount: 1,
      date: '',
      note: '',
      fullName: '',
      email: '',
      phone: ''
    });
    this.pageLoaded = true;
  }

  dostuff() {
    const { value } = this.eventForm;
    console.log(value);
  }
  updateDate(date: Date) {
    this.eventForm.value.date = date;
  }

  ionViewWillLeave() {
    const { value } = this.eventForm;
    this.eventService.eventParameters = value;
  }
   ionViewWillEnter() {
    if (this.pageLoaded) {
      this.eventForm.setValue({
        peopleCount: this.eventService.eventParameters.peopleCount,
        tentCount: this.eventService.eventParameters.tentCount,
        waiterCount: this.eventService.eventParameters.waiterCount,
        note: this.eventService.eventParameters.note,
        date: this.eventService.eventParameters.date,
        fullName: this.eventService.eventParameters.fullName,
        phone: this.eventService.eventParameters.email,
        email: this.eventService.eventParameters.phone
      });
    }
  }

}

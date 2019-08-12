import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {
  eventParameters: {
    peopleCount: number,
    tentCount: number,
    waiterCount: number,
    note: string,
    date: string,
    fullName: string,
    email: string,
    phone: string
  } = {
    peopleCount: 1,
    tentCount: 1,
    waiterCount: 1,
    note: '',
    date: '',
    fullName: '',
    email: '',
    phone: ''
  };

  get eventDetails() {
    return this.eventParameters;
  }
  constructor() { }
}

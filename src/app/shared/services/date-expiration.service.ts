import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateExpirationService {

  constructor() { }

  getDiff(dateSent) {
    const currentDate = new Date();
    dateSent = new Date(dateSent);
    const diff = Math.floor((Date.UTC(dateSent.getFullYear(),
      dateSent.getMonth(), dateSent.getDate(), dateSent.getHours(),
      dateSent.getMinutes()) - Date.UTC(currentDate.getFullYear(),
        currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(),
        currentDate.getMinutes())) / (1000));
    if (diff <= 0) return null;
    if (diff > (60 * 60 * 24)) return Math.floor(diff / (60 * 60 * 24)) + ' días';
    if (diff > (60 * 60)) return Math.floor((diff / (60 * 60))) + ' h';
    if (diff > (60)) return Math.floor(diff / (60)) + ' min';
  }
}

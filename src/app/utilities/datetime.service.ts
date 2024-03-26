import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  formatDateTime(timestamp: string): string {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const formattedDateTime = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${formattedHours}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} ${amPm}`;

    return formattedDateTime;
  }

  formatDateInfo(timestamp: string): string {
    const date = new Date(timestamp);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate().toString().padStart(2);
    const monthOfYear = monthsOfYear[date.getMonth()];
    const year = date.getFullYear();

    const formattedDateTime = `${dayOfWeek}, ${dayOfMonth} ${monthOfYear} ${year}`;

    return formattedDateTime;
  }

  formateDateFormat1(timestamp: Date): string {
    const day = String(timestamp.getDate()).padStart(2, '0');
    const month = String(timestamp.getMonth() + 1).padStart(2, '0');
    const year = timestamp.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate
  }
}

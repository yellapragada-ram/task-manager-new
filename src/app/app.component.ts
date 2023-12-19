import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedDate: Date | null = null; // Initialize as null
  daysOfWeek: string[] = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];

  setSelectedDate(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.selectedDate = inputElement.valueAsDate;
  } 

  getDayFromDate(): number | null {
    return this.selectedDate ? this.selectedDate.getDay() : null;
  }
  newItemTitle: string = '';
  newItemDescription: string = '';
  items: { title: string, description: string }[] = [];

  addItem() {
    if (this.newItemTitle && this.newItemDescription) {
      this.items.push({
        title: this.newItemTitle,
        description: this.newItemDescription
      });
      this.newItemTitle = '';
      this.newItemDescription = '';
    }
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
  }

}

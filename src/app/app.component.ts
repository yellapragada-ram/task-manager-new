import { Component } from '@angular/core';

interface Item {
  title: string;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selectedDate: Date | null = null; // Initialize as null
  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  newItemTitle: string = '';
  newItemDescription: string = '';
  newItemDate: string = ''; 
  editMode: boolean = false;
  editedIndex: number | null = null;

  items: Item[] = [];

  ngOnInit() {
    const currentDate = new Date(); // Get current date
    this.selectedDate = new Date(); // Defaultly selects current date
    this.selectedDate.setHours(0, 0, 0, 0); // Set time to start of the day
    this.disablePastDates();
    this.newItemDate = currentDate.toISOString().split('T')[0];
  }

  getCurrentDate(): string {
    return new Date().toISOString().split('T')[0]; // Return current date in yyyy-mm-dd format
  }

  setSelectedDate(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.selectedDate = new Date(inputElement.value);
  }

  disablePastDates() {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.querySelector("input[type='date']");
    if (dateInput) dateInput.setAttribute('min', today);
  }

  getDayFromDate(): number | null {
    return this.selectedDate ? this.selectedDate.getDay() : null;
  }

  addItem() {
    if (this.newItemTitle) {
      if (this.editMode && this.editedIndex !== null && this.editedIndex >= 0 && this.editedIndex < this.items.length) {
        this.items[this.editedIndex] = {
          title: this.newItemTitle,
          description: this.newItemDescription,
        };
        this.editMode = false;
        this.editedIndex = null;
      } else {
        this.items.push({
          title: this.newItemTitle,
          description: this.newItemDescription,
        });
      }
      this.clearFields();
    }
  }

  editItem(index: number) {
    this.editMode = true;
    this.editedIndex = index;
    this.newItemTitle = this.items[index].title;
    this.newItemDescription = this.items[index].description;
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
  }

  clearFields() {
    this.newItemTitle = '';
    this.newItemDescription = '';
  }
  onDragStart(event: DragEvent, index: number) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', index.toString());
    }
  }
  
  onDrop(event: DragEvent, index: number) {
    event.preventDefault();
    if (event.dataTransfer) {
      const initialIndex = parseInt(event.dataTransfer.getData('text/plain') || '', 10);
      if (!isNaN(initialIndex) && initialIndex !== index && initialIndex >= 0 && initialIndex < this.items.length) {
        const item = this.items.splice(initialIndex, 1)[0];
        this.items.splice(index, 0, item);
      }
    }
  }
  
  allowDrop(event: DragEvent) {
    event.preventDefault();
  }
  
}
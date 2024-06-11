import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Data } from '../../models/data.model';
import { UserIdPipe } from '../../pipes/user-id.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [UserIdPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() data?: Data[]; // Input property to receive data from parent component
  @Output() edit = new EventEmitter<Data>(); // Output event to emit when an item is clicked for editing
  @Output() create = new EventEmitter<void>(); // Output event to emit when the add new item button is clicked

  // sorting order configuration - true for ascending, false for descending
  sortOrder: { lastSorted: keyof Data; order: boolean } = {
    lastSorted: 'id',
    order: true,
  };

  /**
   * Sorts the table data by the specified column.
   * @param column The column to sort by.
   */
  sortTable(column: keyof Data): void {
    if (!this.data) return; // handle undefined case

    // switch ascending and descending order
    // if sorting different columns always start with ascending order
    this.sortOrder.lastSorted === column
      ? (this.sortOrder.order = !this.sortOrder.order)
      : (this.sortOrder.order = true);
    this.sortOrder.lastSorted = column;

    // sorting algorithm
    this.data.sort((a, b) => {
      if (a[column] < b[column]) {
        return this.sortOrder.order ? -1 : 1;
      } else if (a[column] > b[column]) {
        return this.sortOrder.order ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}

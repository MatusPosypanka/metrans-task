import { Component, Input } from '@angular/core';
import { Data } from '../../models/data.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() data?: Data[];

  // Sorting order true for ascending, false for descending
  sortOrder: { lastSorted: keyof Data; order: boolean } = {
    lastSorted: 'id',
    order: true,
  };

  // sort Table
  sortTable(column: keyof Data): void {
    if (!this.data) return;
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

  // Edit existing table row
  editRow(itemId: number): void {
    console.log('edit row', itemId);
  }

  // Create new table row
  createRow(itemId: number): void {
    console.log('edit row', itemId);
  }

  // Delete existing table row
  deleteRow(itemId: number): void {
    console.log('edit row', itemId);
  }
}

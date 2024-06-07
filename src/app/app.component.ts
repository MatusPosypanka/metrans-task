import { Component } from '@angular/core';
import { TableComponent } from './components/table/table.component';
import { DataService } from './services/data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Data } from './models/data.model';
import { ModalService } from './services/modal.service';
import { ItemFormComponent } from './components/item-form/item-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TableComponent, ItemFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  data = this.dataService.dataList; // Array to hold the data items

  constructor(
    private dataService: DataService,
    private modalService: ModalService,
  ) {
    // Subscribe to data service to get the data and update the local state
    this.dataService.fetchData().pipe(takeUntilDestroyed()).subscribe();
  }

  /**
   * Handles the edit event from the TableComponent.
   * Opens the modal with the selected item data.
   * @param item The data item to edit.
   */
  onEditTableItem(item: Data): void {
    const modalRef = this.modalService.openModal(ItemFormComponent, item);
    modalRef.componentInstance.editItem.subscribe((editedItem: Data) => {
      this.dataService.editItem(editedItem);
      modalRef.close();
    });

    modalRef.componentInstance.deleteItem.subscribe((itemId: number) => {
      this.dataService.deleteItem(itemId);
      modalRef.close();
    });
  }

  /**
   * Handles the create event from the TableComponent.
   * Opens the modal to create a new item.
   */
  onCreateTableItem(): void {
    const modalRef = this.modalService.openModal(ItemFormComponent);
    modalRef.componentInstance.save.subscribe((newItem: Data) => {
      this.dataService.createItem(newItem);
      modalRef.close();
    });
  }
}

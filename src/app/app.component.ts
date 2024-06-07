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
  data = this.dataService.dataList;

  constructor(
    private dataService: DataService,
    private modalService: ModalService,
  ) {
    // Fetch data from backend
    this.dataService.getData().pipe(takeUntilDestroyed()).subscribe();
  }

  onEditTableItem(item: Data): void {
    const modalRef = this.modalService.openModal(ItemFormComponent, item);
    modalRef.componentInstance.save.subscribe((editedItem: Data) => {
      this.dataService.editItem(editedItem);
      modalRef.close();
    });

    modalRef.componentInstance.delete.subscribe((itemId: number) => {
      this.dataService.deleteItem(itemId);
      modalRef.close();
    });
  }

  onCreateTableItem(): void {
    const modalRef = this.modalService.openModal(ItemFormComponent);
    modalRef.componentInstance.save.subscribe((newItem: Data) => {
      this.dataService.createItem(newItem);
      modalRef.close();
    });
  }
}

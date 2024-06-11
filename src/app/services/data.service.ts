import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '../models/data.model';
import { tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  // WritableSignal to hold the state of the data list
  dataList: WritableSignal<Data[]> = signal<Data[]>([]);

  /**
   * Fetches data from the backend and calls transformData.
   * @returns Observable of Data array
   */
  fetchData(): Observable<Data[]> {
    return this.http
      .get<Data[]>(this.dataUrl)
      .pipe(tap((data) => this.dataList.set(data)));
  }

  /**
   * Creates a new item and updates the state.
   * @param item - New item to be added
   */
  createItem(item: Omit<Data, 'id'>): void {
    // With BE: this.http.post<Data>(this.dataUrl, item).pipe(tap( item => ... ))
    this.dataList.update((dataList) => [
      ...dataList,
      { ...item, id: this.generateId(dataList) },
    ]);
  }

  /**
   * Edits an existing item in the state.
   * @param editedItem - Item with updated data
   */
  editItem(editedItem: Data): void {
    // With BE: this.http.put<Data>(`${this.dataUrl}/${id}`,item).pipe(tap( item => ... ))
    this.dataList.update((dataList) => {
      return dataList.map((item) =>
        item.id === editedItem.id ? editedItem : item,
      );
    });
  }

  /**
   * Deletes an item from the state.
   * @param itemId - ID of the item to be deleted
   */
  deleteItem(itemId: number): void {
    // With BE: this.http.delete(`${this.dataUrl}/${id}`).pipe(tap( item => ... ))
    this.dataList.update((dataList) =>
      dataList.filter((item) => item.id !== itemId),
    );
  }

  /**
   * Generates a new unique ID for an item in the array.
   * @param list - Current list of items
   * @returns New unique ID
   */
  private generateId(list: Data[]): number {
    return list.length > 0 ? Math.max(...list.map((item) => item.id)) + 1 : 1;
  }
}

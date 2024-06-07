import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '../models/data.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  // State management
  dataList: WritableSignal<Data[]> = signal<Data[]>([]);

  // Fetch data from backend, transform userId property and save it to state
  getData(): Observable<Data[]> {
    return this.http.get<Data[]>(this.dataUrl).pipe(
      tap((data) => {
        // Map UserID property to strings
        // 1 => admin
        // 2 => tester
        // everything else => neznámý uživatel
        const transformedData = data
          ? data.map((item) =>
              item.userId === 1
                ? { ...item, userId: 'admin' }
                : item.userId === 2
                  ? { ...item, userId: 'tester' }
                  : { ...item, userId: 'neznámý uživatel' },
            )
          : [];
        // Update state with transformed data
        this.dataList.set(transformedData);
      }),
    );
  }

  // Create new item from dataList
  createItem(item: Omit<Data, 'id'>): void {
    console.log('dataservice: create');
    this.dataList.update((dataList) => [
      ...dataList,
      { ...item, id: this.generateId(dataList) },
    ]);
  }

  // Edit existing item from dataList
  editItem(editedItem: Data): void {
    this.dataList.update((dataList) => {
      return dataList.map((item) =>
        item.id === editedItem.id ? editedItem : item,
      );
    });
  }

  // Delete existing item from dataList
  deleteItem(itemId: number): void {
    this.dataList.update((dataList) =>
      dataList.filter((item) => item.id !== itemId),
    );
  }

  // generate new unique id for item in the array
  private generateId(list: Data[]): number {
    return list.length > 0 ? Math.max(...list.map((item) => item.id)) + 1 : 1;
  }
}

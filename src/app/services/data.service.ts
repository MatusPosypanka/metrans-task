import { Injectable, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { Data } from '../models/data.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataUrl = 'https://jsonplaceholder.typicode.com/todos';
  constructor(private http: HttpClient) {}

  // State management
  // Fetched data conversion to signal and UserId transformation
  data: Signal<Data[] | undefined> = toSignal<Data[]>(
    this.getData().pipe(
      // Map UserID property to strings
      // 1 => admin
      // 2 => tester
      // everything else => neznámý uživatel
      map((data) =>
        data
          ? data.map((item) =>
              item.userId === 1
                ? { ...item, userId: 'admin' }
                : item.userId === 2
                  ? { ...item, userId: 'tester' }
                  : { ...item, userId: 'neznámý uživatel' },
            )
          : [],
      ),
    ),
  );

  // Fetch data from backend
  getData(): Observable<Data[] | undefined> {
    return this.http.get<Data[]>(this.dataUrl);
  }
}

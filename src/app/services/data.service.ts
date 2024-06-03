import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Data } from "../models/data.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataUrl = 'https://jsonplaceholder.typicode.com/todos';
  constructor(private http: HttpClient) { }

  getData(): Observable<Data[]> {
    return this.http.get<Data[]>(this.dataUrl);
  }
}

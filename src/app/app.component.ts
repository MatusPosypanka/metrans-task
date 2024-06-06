import { Component } from '@angular/core';
import { TableComponent } from './components/table/table.component';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  data = this.dataService.data;
  constructor(private dataService: DataService) {}
}

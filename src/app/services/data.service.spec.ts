import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DataService } from './data.service';
import { Data } from '../models/data.model';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  const mockData: Data[] = [
    { id: 1, userId: 1, title: 'mock title', completed: true },
    { id: 2, userId: 2, title: 'mock title 2', completed: true },
    { id: 3, userId: 3, title: 'mock title 3', completed: false },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch data and transform userId properties', () => {
    service.fetchData().subscribe((data) => {
      expect(data.length).toBe(3);
      expect(service.dataList().length).toBe(3);
      expect(service.dataList()[0].userId).toBe('admin');
      expect(service.dataList()[1].userId).toBe('tester');
      expect(service.dataList()[2].userId).toBe('neznámý uživatel');
    });

    const req = httpMock.expectOne(service['dataUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should create a new item and update the state', () => {
    const newItem: Omit<Data, 'id'> = {
      userId: 4,
      title: 'mock title 4',
      completed: false,
    };
    service.createItem(newItem);
    expect(service.dataList().length).toBe(1);
    expect(service.dataList()[0].title).toBe('mock title 4');
  });

  it('should edit an existing item and update the state', () => {
    service['dataList'].set(mockData);
    const editedItem: Data = {
      userId: 1,
      id: 1,
      title: 'updated mock title',
      completed: true,
    };
    service.editItem(editedItem);
    expect(service.dataList()[0].title).toBe('updated mock title');
    expect(service.dataList()[0].completed).toBe(true);
  });

  it('should delete an item from the state', () => {
    service.dataList.set(mockData);
    service.deleteItem(1);
    expect(service.dataList().length).toBe(2);
    expect(service.dataList().find((item) => item.id === 1)).toBeUndefined();
  });
});

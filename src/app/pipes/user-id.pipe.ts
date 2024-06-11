import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userId',
  standalone: true,
})
export class UserIdPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return 'admin';
      case 2:
        return 'tester';
      default:
        return 'neznámý uživatel';
    }
  }
}

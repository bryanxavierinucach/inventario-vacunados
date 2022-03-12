import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HeaderService {
  title = new BehaviorSubject<string>(null);
  togleSidebar = new BehaviorSubject<boolean>(null);

  setTitle(data: string) {
    this.title.next(data);
  }

  setToogleSidebar(data: boolean) {
    this.togleSidebar.next(data);
  }

}

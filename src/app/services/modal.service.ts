import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private modalService: NgbModal) {}

  // Opens modal with custom content
  openModal(content: unknown, data?: unknown) {
    const modalRef = this.modalService.open(content);
    if (data) {
      modalRef.componentInstance.data = data;
    }

    return modalRef;
  }
}

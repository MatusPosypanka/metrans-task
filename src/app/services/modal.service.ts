import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private modalService: NgbModal) {}

  /**
   * Opens the modal with the custom component as content.
   * @param content Custom component.
   * @param data Optional component data.
   * @returns The modal reference.
   */
  openModal(content: unknown, data?: unknown): NgbModalRef {
    const modalRef = this.modalService.open(content);
    if (data) {
      modalRef.componentInstance.data = data;
    }

    return modalRef;
  }
}

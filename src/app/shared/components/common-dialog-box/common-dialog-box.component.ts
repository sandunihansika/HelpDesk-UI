import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbdModalContent} from '../../../components/base/modal/modal.component';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-common-dialog-box',
  templateUrl: './common-dialog-box.component.html',
  styleUrls: ['./common-dialog-box.component.scss']
})
export class CommonDialogBoxComponent implements OnInit {

  constructor(private modalService : NgbModal) {

  }
  @Input() showDialogBox = false;
  @Output() addButton = new EventEmitter();

  ngOnInit(): void {

  }



  openModal() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
  }




}

import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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
  @ViewChild('content', { static: false }) content: any;
  private _setDialogBox: boolean;
  @Input() header : string;
  @Output() closeButtonClick = new EventEmitter();

  ngOnInit(): void {
  this._setDialogBox = false;
  }
  closeResult: string;


  get dialogBox(){
    return this._setDialogBox;
  }
@Input()
  set dialogBox(value){
  this._setDialogBox =value;
  if(value === true){
    this.open(this.content);
  }
  }


  openModal() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  // this.content.dismiss(){
  //   this._setDialogBox = false;
  // }

close(){

 this.content.disable;
}
  method(modal){
    modal.dismiss();
    this._setDialogBox = false;
    this.closeButtonClick.emit(1);
  }


}

import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { NgbdModalContent } from "../../../components/base/modal/modal.component";
import {
  NgbActiveModal,
  NgbModal,
  ModalDismissReasons,
  NgbModalConfig,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-common-dialog-box",
  templateUrl: "./common-dialog-box.component.html",
  styleUrls: ["./common-dialog-box.component.scss"],
})
export class CommonDialogBoxComponent implements OnInit {
  constructor(private modalService: NgbModal) {}
  @ViewChild("content", { static: false }) content: any;
  _setDialogBox: boolean;
  // @Input() setDialogBox: boolean;
  // @Input() setDialogBox2: boolean;
  @Input() header: string;
  @Output() closeButtonClick = new EventEmitter();
  @Output() saveButton = new EventEmitter();

  ngOnInit(): void {
    this._setDialogBox = false;
  }
  closeResult: string;
  get dialogBox() {
    return this._setDialogBox;
  }

  @Input()
  set dialogBox(value) {
    this._setDialogBox = value;
  }

  hide() {
    this.closeButtonClick.emit(1);
  }
}

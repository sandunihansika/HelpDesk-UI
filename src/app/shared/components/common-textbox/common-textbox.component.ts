/* tslint:disable:semicolon */
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  NgModule
} from "@angular/core";
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormGroup, Validators, FormControl, FormBuilder, FormsModule, AbstractControl, NG_VALIDATORS
} from '@angular/forms';
import { TextBoxTypes } from "../../services/common/enum";

@Component({
  selector: "app-common-textbox",
  templateUrl: "./common-textbox.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CommonTextboxComponent),
      multi: true,
    },
  ],
  styleUrls: ["./common-textbox.component.scss"],
})
export class CommonTextboxComponent implements OnInit, ControlValueAccessor {
  constructor( private fb: FormBuilder) {}
  commonTextBox : FormGroup;
  // tslint:disable-next-line:variable-name
  @Input("value") _value = "";
  @Input() inputType: TextBoxTypes;
  @Input() placeholder;
  @Input() class;

  getInvalid: any;
  // @Output() inputModelChange = new EventEmitter<string>();
  onModelChange = (x) => {};
  onModelTouched = () => {};
  @Input() labelName;

  ngOnInit(): void { }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }

  host: {
    // '(change)': '_onChange($event.target.value)'
    '(blur)': 'onModelTouched()'
  }

  writeValue(value) {
    this.value = value;
  }

  //My additionssss.......................***********************

  // writeValue(input: string) {
  //   this.input.setValue(input);
  // }
  // subscriptions = [];
  // registerOnChange(fn: any): void {
  //   this.subscriptions.push(
  //     this.input.valueChanges.subscribe(fn)
  //   );
  // }
  // ngOnDestroy() {
  //   this.subscriptions.forEach(sub => sub.unsubscribe());
  // }
  // onTouch: any = () => {}
  // registerOnTouched(fn: any): void {
  //   this.onTouch = fn;
  // }
//////////////////////////////////////////////////

  set value(val) {
    this.onModelChange(val);
    this.onModelTouched();
    this._value = val;
    // this.inputModelChange.emit(val);
  }

  get value() {
    return this._value;
  }

  handleChange(val){
    this.value = val.target.value;
  }

}





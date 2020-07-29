import {Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-common-radiobutton',
  templateUrl: './common-radiobutton.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CommonRadiobuttonComponent),
      multi: true
    }
  ],
  styleUrls: ['./common-radiobutton.component.scss']
})
export class CommonRadiobuttonComponent implements OnInit, ControlValueAccessor {

  constructor() {
  }

  @Input() groupName: string;
  @Input() label: string;
  // tslint:disable-next-line:variable-name no-input-rename
  @Input('value') _value: string;
  // @Output() opRadioValue = new EventEmitter<string>();
  @ViewChild('radio', {static: false}) radio: any;
  onModelChange = (x) => {
  };
  onModelTouched = () => {
  };

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

  writeValue(value: any): void {
    console.log(value + '*********');
    this.value = value;

  }

  set value(val) {
    this.onModelChange(val);
    this.onModelTouched();
    this._value = val;
    // this.opRadioValue.emit(val);
  }

  get value() {
    return this._value;
  }

  handleRadioChange(val) {
    this.value = val.target.value;
  }

}

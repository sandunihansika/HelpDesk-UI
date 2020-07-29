import {Component, OnInit, Input, Output, EventEmitter, forwardRef} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/forms';


@Component({
  selector: 'app-common-calender',
  templateUrl: './common-calender.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CommonCalenderComponent),
      multi: true
    }
  ],
  styleUrls: ['./common-calender.component.scss']
})
export class CommonCalenderComponent implements OnInit, ControlValueAccessor {

  constructor() {
  }

  // tslint:disable-next-line:variable-name no-input-rename
  @Input('value') _value = '';

  ngOnInit(): void {
  }

  onModelChange = (x) => {
  };
  onModelTouched = () => {
  };


  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  set value(val) {
    this.onModelChange(val);
    this.onModelTouched();
    this._value = val;
    // this.inputModelChange.emit(val);
  }

  get value() {
    return this._value;
  }

  handleChange(val) {
    this.value = val.target.value;
  }


}

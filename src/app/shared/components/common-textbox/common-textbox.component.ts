/* tslint:disable:semicolon */
import {Component, OnInit, Input, Output, EventEmitter, forwardRef} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/forms';
import {TextBoxTypes} from '../../services/common/enum';

@Component({
  selector: 'app-common-textbox',
  templateUrl: './common-textbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CommonTextboxComponent),
      multi: true
    }
  ],
  styleUrls: ['./common-textbox.component.scss']
})
export class CommonTextboxComponent implements OnInit, ControlValueAccessor {

  constructor() {
  }

  // tslint:disable-next-line:variable-name
  @Input('value') _value = '';
  @Input() inputType: TextBoxTypes;
  @Output() inputModelChange = new EventEmitter<string>();
  onModelChange = (x) => {
  };
  onModelTouched = () => {
  };

  ngOnInit(): void {
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }

  writeValue(value) {
    this.value = value;
  }

  set value(val) {
    this.onModelChange(val);
    this.onModelTouched();
    this._value = val;
    this.inputModelChange.emit(val);
  }

  get value() {
    return this._value;
  }

  handleChange(val) {
    this.value = val.target.value;
  }

}

import {Component, OnInit, Input, Output, EventEmitter, forwardRef} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/forms';

@Component({
  selector: 'app-common-textarea',
  templateUrl: './common-textarea.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CommonTextareaComponent),
      multi: true
    }
  ],
  styleUrls: ['./common-textarea.component.scss']
})
export class CommonTextareaComponent implements OnInit, ControlValueAccessor {

  constructor() {
  }

  // tslint:disable-next-line:variable-name no-input-rename
  @Input('value') _value = '';
  @Input() rows;
  @Input() cols;
  // @Output() inputModelChange = new EventEmitter<string>();
  onModelChange = (x) => {
  }
  onModelTouched = () => {
  }

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
    // this.inputModelChange.emit(val);
  }

  get value() {
    return this._value;
  }

  handleChange(val) {
    this.value = val.target.value;
  }

}

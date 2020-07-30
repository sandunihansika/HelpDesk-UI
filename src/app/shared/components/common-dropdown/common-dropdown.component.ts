import {Component, Input, OnInit, Output, EventEmitter, forwardRef} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormArray,
  FormControl,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/forms';

@Component({
  selector: 'app-common-dropdown',
  templateUrl: './common-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CommonDropdownComponent),
      multi: true
    }
  ],
  styleUrls: ['./common-dropdown.component.scss']
})
export class CommonDropdownComponent implements OnInit {

  @Input('value') _value = '';
  @Input() placeholder:string;
  @Input() fields = [];
  @Output() selectChange = new EventEmitter<string>();
  onModelChange: Function = () => {
  };
  onModelTouched: Function = () => {
  };

  constructor() { }

  ngOnInit(): void {
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }

  writeValue(value) {
    console.log(value + '@@');
    this.value = value;
  }

  set value(val) {
    this.onModelChange(val);
    this.onModelTouched();
    this._value = val;
    this.selectChange.emit(val);
  }

  get value() {
    return this._value;
  }

  handleChange(val) {
    this.value = val.value;
  }

}

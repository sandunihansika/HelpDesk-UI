// /* tslint:disable:semicolon */
// import {
//   Component,
//   OnInit,
//   Input,
//   Output,
//   EventEmitter,
//   forwardRef,
// } from "@angular/core";
// import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
// import { TextBoxTypes } from "../../services/common/enum";
//
// @Component({
//   selector: "app-common-textbox",
//   templateUrl: "./common-textbox.component.html",
//   providers: [
//     {
//       provide: NG_VALUE_ACCESSOR,
//       useExisting: forwardRef(() => CommonTextboxComponent),
//       multi: true,
//     },
//   ],
//   styleUrls: ["./common-textbox.component.scss"],
// })
// export class CommonTextboxComponent implements OnInit, ControlValueAccessor {
//   constructor() {}
//
//   // tslint:disable-next-line:variable-name
//   @Input("value") _value = "";
//   @Input() inputType: TextBoxTypes;
//   @Input() placeholder;
//   @Input() class;
//   // @Output() inputModelChange = new EventEmitter<string>();
//   onModelChange = (x) => {};
//   onModelTouched = () => {};
//
//   ngOnInit(): void {}
//
//   registerOnChange(fn) {
//     this.onModelChange = fn;
//   }
//
//   registerOnTouched(fn) {
//     this.onModelTouched = fn;
//   }
//
//   writeValue(value) {
//     this.value = value;
//   }
//
//   set value(val) {
//     this.onModelChange(val);
//     this.onModelTouched();
//     this._value = val;
//     // this.inputModelChange.emit(val);
//   }
//
//   get value() {
//     return this._value;
//   }
//
//   handleChange(val) {
//     this.value = val.target.value;
//   }
// }

// / tslint:disable:semicolon /;
// import {
//   Component,
//   OnInit,
//   Input,
//   Output,
//   EventEmitter,
//   forwardRef,
// } from "@angular/core";
// import {
//   NG_VALUE_ACCESSOR,
//   ControlValueAccessor,
//   FormGroup,
//   Validators,
//   FormControl,
//   FormBuilder,
// } from "@angular/forms";
// import { TextBoxTypes } from "../../services/common/enum";
//
// @Component({
//   selector: "app-common-textbox",
//   templateUrl: "./common-textbox.component.html",
//   providers: [
//     {
//       provide: NG_VALUE_ACCESSOR,
//       useExisting: forwardRef(() => CommonTextboxComponent),
//       multi: true,
//     },
//   ],
//   styleUrls: ["./common-textbox.component.scss"],
// })
// export class CommonTextboxComponent implements OnInit, ControlValueAccessor {
//   constructor(private fb: FormBuilder) {}
//   commonTextBox: FormGroup;
//   // tslint:disable-next-line:variable-name
//
//   @Input("value") _value = "";
//   @Input() inputType: TextBoxTypes;
//   @Input() placeholder;
//   @Input() class;
//   // @Output() inputModelChange = new EventEmitter<string>();
//   onModelChange = (x) => {};
//   onModelTouched = () => {};
//   @Input() labelName;
//
//   ngOnInit(): void {
//     this.commonTextBox = this.fb.group({
//       _value: [
//         "",
//         [
//           Validators.required,
//           Validators.pattern("[a-zA-Z][a-zA-Z ]+[a-zA-Z]$"),
//         ],
//       ],
//     });
//   }
//
//   getCommonInput() {
//     return this.commonTextBox.get("_value");
//   }
//
//   registerOnChange(fn) {
//     this.onModelChange = fn;
//   }
//
//   registerOnTouched(fn) {
//     this.onModelTouched = fn;
//   }
//
//   writeValue(value) {
//     this.value = value;
//   }
//
//   set value(val) {
//     this.onModelChange(val);
//     this.onModelTouched();
//     this._value = val;
//     // this.inputModelChange.emit(val);
//   }
//
//   get value() {
//     return this._value;
//   }
//
//   handleChange(val) {
//     this.value = val.target.value;
//   }
// }
//
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  NgModule, ViewChild, ElementRef
} from '@angular/core';
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
  // tslint:disable-next-line:variable-name
  @Input("value") _value = "";
  @Input() inputType: TextBoxTypes;
  @Input() placeholder;
  @Input() class;

  @Input() c:FormControl = new FormControl();
  @ViewChild('input')  inputRef:ElementRef;

  // @Output() inputModelChange = new EventEmitter<string>();
  onModelChange = (x) => {};
  onModelTouched = () => {};
  @Input() labelName;

  ngOnInit(): void { }

  ngAfterViewInit(){
    // // set placeholder default value when no input given to pH property
    // if(this.pH === undefined){
    //   this.pH = "Enter "+this.text;
    // }

    // RESET the custom input form control UI when the form control is RESET
    this.c.valueChanges.subscribe(
      () => {
        // check condition if the form control is RESET
        if (this.c.value == "" || this.c.value == null || this.c.value == undefined) {
          this._value = "";
          this.inputRef.nativeElement.value = "";
        }
      }
    );
  }


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

  set value(val) {
    // this.onModelChange(val);
    // this.onModelTouched();
    // this._value = val;
    // this.inputModelChange.emit(val);
    if (val !== this._value) {
      this.onModelChange(val);
      this._value = val;
    } else{
      this.onModelChange(val);
      this.onModelTouched();
      this._value = val;
    }
  }

  get value() {
    return this._value;
  }

  handleChange(val){
    this.value = val.target.value;
  }

}

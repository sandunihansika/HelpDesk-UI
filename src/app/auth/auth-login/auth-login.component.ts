import { FormValidationHelpers } from "../../shared/helpers/form-validation-helpers";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../shared/services/auth/authentication.service";
import { User } from "./user";
import { StatusCodes, TextBoxTypes } from "src/app/shared/services/common/enum";
import { PasswordHash } from "./password-hash";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-auth-login",
  templateUrl: "./auth-login.component.html",
  styleUrls: ["./auth-login.component.scss"],
})
export class AuthLoginComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private passwordHash: PasswordHash,
    private router: Router,
    private formBuilder: FormBuilder,
    private formValidationHelper: FormValidationHelpers,
    private toastrService: ToastrService
  ) {
    this.url = "/dashboard/default";
  }

  ngOnInit(): void {
    this.getFormDetails();
  }

  loginForm: FormGroup;
  newPassword: string;
  // saveDetails = false;
  url: string;
  TextBoxTypes: typeof TextBoxTypes = TextBoxTypes;
  user: User = new User();
  spinner: boolean = false;

  getFormDetails() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      saveDetails: false,
    });
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  get saveDetails() {
    return this.loginForm.get("saveDetails");
  }

  login() {
    this.spinner = true;
    try {
      if (this.loginForm.invalid) {
        this.formValidationHelper.validateAllFormFields(this.loginForm);
        this.danger();
        return;
      }

      this.newPassword = this.passwordHash.hashPassword(this.password.value);

      this.authService
        .login(this.email.value, this.newPassword, this.saveDetails.value)
        .subscribe((response) => {
          if (response && response.statusCode === StatusCodes.Success) {
            this.success();
            console.log("login success");
            this.router.navigate([this.url]);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  success() {
    this.toastrService.success("Login successful!", "Success!");
  }
  danger() {
    this.toastrService.error("Login failed", "Error!");
  }
}

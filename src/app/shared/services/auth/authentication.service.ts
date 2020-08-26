import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import * as jwt_decode from 'jwt-decode';
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {LoggedUserDetails} from '../../../auth/logged-user-details';
import { UserType,StatusCodes } from '../common/enum';
import {User} from '../../../auth/auth-login/user';
import {LoginResult} from '../../model/e-commerce/login-result.model';
import { AuthEvent } from 'src/app/auth/auth-login/auth-event';
import {loggedSettingDetails} from '../../../auth/login/logged-setting-details';
import { ToastrService } from "ngx-toastr";
@Injectable({providedIn:"root"})



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // private eventAuthError = new BehaviorSubject<string>("")
  // eventAuthError$ = this.eventAuthError.asObservable();
  private currentUserSubject: BehaviorSubject<LoggedUserDetails>;  //create a logged user object
  private currentUser: Observable<LoggedUserDetails>;    //create a currentUser observable
  AuthEvent: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastrService :ToastrService,
    private authEvent: AuthEvent) {
    if (localStorage.getItem('currentUser') && JSON.parse(localStorage.getItem('currentUser')).saveDetails === false) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject = new BehaviorSubject<LoggedUserDetails>(JSON.parse(localStorage.getItem('currentUser')));  //override currentUserSubject
    this.currentUser = this.currentUserSubject.asObservable();   // broadcast current user by using observables. can access from any component by subscribing it
  }

  public get currentUserValue(): LoggedUserDetails {
    return this.currentUserSubject.value;
  }

  getNewHttpHeaders() {
    return new HttpHeaders()
      .set('userType', UserType.AdminUser.toString())
      .set('clientId', "3")

  }

  login(email, password, saveDetails) {
    const user: User = {
      email: email,
      password: password
    }
    console.log(email,password);
      return this.http.post<any>("http://localhost:3000/loginUser/loginp",user,{headers:this.getNewHttpHeaders()})
      .pipe(
        map((response : LoginResult)=>{
            if(response.statusCode == StatusCodes.Success){
              const decodedToken = this.getDecodedToken(response.data.token);
              decodedToken.token = response.data.token;
              decodedToken.saveDetails = saveDetails;
              localStorage.setItem('currentUser', JSON.stringify(decodedToken));
              loggedSettingDetails.email = decodedToken.email;
              loggedSettingDetails.clientId = decodedToken.clientId;
              loggedSettingDetails.displayName = decodedToken.displayName;
              loggedSettingDetails.token = decodedToken.token;
              console.log("this is token :" +  loggedSettingDetails.token);
              loggedSettingDetails.loginId = decodedToken.globalUserId;
              console.log( loggedSettingDetails.loginId);
              this.currentUserSubject.next(response.data);  // change the value of currentUserSubject behavior
              this.authEvent.UserLoggedIn.emit()
              return response;

            } else if(response && response.statusCode == StatusCodes.Unauthorized){
                 console.log(response.message);
                 this.toastrService.error(response.message, 'Error');
            }else if(response && response.message && response.message !== ''){
              this.toastrService.error(response.message, 'Error');
            } else {
              this.toastrService.error(response.message, 'Error');
            }
  })
)
}
  getDecodedToken(token:string):any{
    try{
      return jwt_decode(token);
    }catch (e) {
      return null;
    }
  }

  logOut(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login'])

  }



}

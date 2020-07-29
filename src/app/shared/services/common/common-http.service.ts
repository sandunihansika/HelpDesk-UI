import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthenticationService} from '../auth/authentication.service';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {LoggedUserDetails} from '../../../auth/logged-user-details';
import {ToastService} from './toast.service';
import {UserType} from './enum';
import {StatusCodes} from './enum';


@Injectable({
  providedIn: 'root'
})

export class CommonHttpService {
  private currentUserSubject: BehaviorSubject<LoggedUserDetails>;
  public currentUser: Observable<LoggedUserDetails>;
  public token: any;

  constructor(
    private http: HttpClient,
    private  router: Router,
    private authenticationService: AuthenticationService,
    private toastService: ToastService
  ) {
    this.currentUserSubject = new BehaviorSubject<LoggedUserDetails>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.token = LoggedUserDetails.token;
  }

  getHttpHeaders() {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'bearer ' + this.token)
      .set('userType', UserType.AdminUser.toString())
      .set('clientId', '3');
  }

  getMultipartHttpHeaders() {
    return new HttpHeaders()
      .set('Authorization', 'bearer ' + this.token)
      // .set('loginId', UserType.globalUserId.toString())
      .set('userType', UserType.AdminUser.toString())
      .set('userType', UserType.toString());
  }

  postData(subUrl: string, data: any) {
    return this.http.post<any>(environment.baseUrl + subUrl, data, {headers: this.getHttpHeaders()}).pipe(
      map(response => {
        if (response && response.statusCode === StatusCodes.Success) {
          return response;
        } else if (response && response.statusCode === StatusCodes.Unauthorized) {
          this.authenticationService.logOut(); /*remove comment after auth service implemented*/
          this.router.navigate(['/auth/login']).then(() => {
          });
          this.toastService.error('Error', response.message);
        } else {
          this.toastService.error('Error', response.message);
          return response;
        }
      })
    );
  };

  getAll(subUrl: string) {
    return this.http.get<any>(environment.baseUrl + subUrl, {headers: this.getHttpHeaders()}).pipe(
      map(response => {
        if (response && response.statusCode === StatusCodes.Success) {
          return response;
        } else if (response && response.statusCode === StatusCodes.Unauthorized) {
          this.authenticationService.logOut();
          this.router.navigate(['/auth/login']).then(() => {
          });
          this.toastService.error('Error', response.message);
        } else {
          this.toastService.error('Error', response.message);
          return response;
        }
      })
    );
  }

  postUploadData(subUrl: string, data: any) {
    return this.http.post<any>(environment.baseUrl + subUrl, data, {headers: this.getMultipartHttpHeaders()}).pipe(
      map(response => {
        if (response && response.statusCode === StatusCodes.Success) {
          return response;
        } else if (response && response.statusCode === StatusCodes.Unauthorized) {
          this.authenticationService.logOut();
          this.router.navigate(['/auth/login']).then(() => {
          });
          this.toastService.error('Error', response.message);
        } else {
          this.toastService.error('Error', response.message);
          return response;
        }
      })
    );
  }

}



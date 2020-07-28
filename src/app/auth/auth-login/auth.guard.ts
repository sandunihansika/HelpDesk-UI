import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../../shared/services/auth/authentication.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private authService:AuthenticationService) {}

  user = false;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // this.user = this.authService.currentUserValue;
    // const currentUser = this.authService.currentUserValue;
    if ( this.authService.currentUserValue) {
      return true;
    }
    // if (this.user) {
    //     return true;
    // }
    // this.router.navigate(['/login']);
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } }).then(() => {
      return false;
    });


  }
}

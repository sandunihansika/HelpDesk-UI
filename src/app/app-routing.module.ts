import {NgModule} from '@angular/core';
import {RouterModule, Routes, PreloadAllModules} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {ContentLayoutComponent} from './shared/components/layout/content-layout/content-layout.component';
import {FullLayoutComponent} from './shared/components/layout/full-layout/full-layout.component';
import {content} from './shared/routes/content-routes';
import {full} from './shared/routes/full.routes';
import {AdminGuard} from './shared/guard/admin.guard';
import {CustomerDetailsComponent} from './components/inquery/inquery/customer-details/customer-details/customer-details.component';
import {AuthLoginComponent} from './auth/auth-login/auth-login.component';
import {AuthGuard} from './auth/auth-login/auth.guard';
import {InqueryTableComponent} from './components/inquery/inquery/inquery-table/inquery-table.component';
import {QuatationComponent} from './components/inquery/inquery/inquery-table/quatation/quatation/quatation.component';
import {CorporateDetailsComponent} from './components/inquery/inquery/customer-details/corporate-details/corporate-details.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-login.module').then(m => m.AuthLoginModule)
  },
  // {
  //   path: '',
  //   redirectTo: 'dashboard/default',
  //    canActivate: [AuthGuard],
  //   pathMatch: 'full'
  // }
  // ,


  // {path : 'auth/login',
  // component : AuthLoginComponent },

  {
    path: '',
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
    children: content,

  },
  {
    path: '',
    component: FullLayoutComponent,
    // canActivate: [AuthGuard],
    children: full,


  },

  {
    path: '**',
    redirectTo: 'auth/login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

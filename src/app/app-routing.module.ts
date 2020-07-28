import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ContentLayoutComponent } from './shared/components/layout/content-layout/content-layout.component';
import { FullLayoutComponent } from './shared/components/layout/full-layout/full-layout.component';
import { content } from './shared/routes/content-routes';
import { full } from './shared/routes/full.routes';
import { AdminGuard } from './shared/guard/admin.guard';
import {CustomerDetailsComponent} from './components/inquery/inquery/customer-details/customer-details/customer-details.component';
import {AuthLoginComponent} from './auth/auth-login/auth-login.component';
import {AuthGuard} from './auth/auth-login/auth.guard';
import {InqueryTableComponent} from './components/inquery/inquery/inquery-table/inquery-table.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/default',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: '',
    component: ContentLayoutComponent,
    // canActivate: [AdminGuard],
    children: content
  },
  {
    path: '',
    component: FullLayoutComponent,
    // canActivate: [AdminGuard],
    children: full
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

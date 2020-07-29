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

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/default',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    component: AuthLoginComponent
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
    path: 'grid',
    component: InqueryTableComponent,
    loadChildren: () => import('./components/inquery/inquery/inquery.module').then(m => m.InqueryModule)
  },
  {
    path: 'customer',
    component: CustomerDetailsComponent,
    loadChildren: () => import('./components/inquery/inquery/customer-details/customer-details.module').then(m => m.CustomerDetailsModule)
  },
  {
    path: 'quatation',
    component: QuatationComponent,
    loadChildren: () => import('./components/inquery/inquery/inquery-table/quatation/quatation.module').then(m => m.QuatationModule)
  },
  {
    path: '**',
    redirectTo: ''
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

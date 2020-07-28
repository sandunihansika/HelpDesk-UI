import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ContentLayoutComponent } from './shared/components/layout/content-layout/content-layout.component';
import { FullLayoutComponent } from './shared/components/layout/full-layout/full-layout.component';
import { content } from './shared/routes/content-routes';
import { full } from './shared/routes/full.routes';
import { AdminGuard } from './shared/guard/admin.guard';
import {CustomerDetailsComponent} from './components/inquery/inquery/customer-details/customer-details/customer-details.component';
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
    path: 'grid',
    component:InqueryTableComponent,
    loadChildren: () => import('./components/inquery/inquery/inquery.module').then(m => m.InqueryModule)
  },
  // {
  //   path: 'customer',
  //   component:CustomerDetailsComponent,
  //   loadChildren: () => import('./components/inquery/inquery/inquery.module').then(m => m.InqueryModule)
  // },
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentLayoutComponent } from './components/layout/content-layout/content-layout.component';
import { FullLayoutComponent } from './components/layout/full-layout/full-layout.component';
import { FeatherIconsComponent } from './components/feather-icons/feather-icons.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { TranslateModule } from '@ngx-translate/core';
import { CustomizerComponent } from './components/customizer/customizer.component';
import { DragulaModule } from 'ng2-dragula';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import 'hammerjs';
import 'mousetrap';

// services
import { NavService } from './services/nav.service';
import { ChatService } from './services/chat.service';
import { CustomizerService } from './services/customizer.service';
// Directives
import { ToggleFullscreenDirective } from './directives/fullscreen.directive';
import { CommonTextboxComponent } from './components/common-textbox/common-textbox.component';
import { CommonRadiobuttonComponent } from './components/common-radiobutton/common-radiobutton.component';
import { CommonDropdownComponent } from './components/common-dropdown/common-dropdown.component';
import { CommonGridComponent } from './components/common-grid/common-grid.component';

@NgModule({
  declarations: [
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BookmarkComponent,
    RightSidebarComponent,
    ContentLayoutComponent,
    FullLayoutComponent,
    FeatherIconsComponent,
    ToggleFullscreenDirective,
    BreadcrumbComponent,
    CustomizerComponent,
    CommonTextboxComponent,
    CommonRadiobuttonComponent,
    CommonDropdownComponent,
    CommonGridComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TranslateModule,
    DragulaModule.forRoot(),
    NgbModule,
    GalleryModule.forRoot(),
    DropdownModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    InputTextModule,
    ToolbarModule,
    CardModule,
    RadioButtonModule
  ],
  exports: [
    LoaderComponent,
    FeatherIconsComponent,
    TranslateModule,
    CommonTextboxComponent,
    CommonRadiobuttonComponent,
    CommonDropdownComponent,
    CommonGridComponent
  ],
  providers: [
    NavService,
    ChatService,
    CustomizerService
  ]
})
export class SharedModule { }


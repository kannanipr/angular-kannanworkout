import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './shared/header/header.module';
import { SideMenuModule } from './shared/side-menu/side-menu.module';
import { PaginationModule } from '@shared/pagination/pagination.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SnackbarModule } from '@shared/snackbar/snackbar.module';
import { GenericModalModule } from '@shared/generic-modal/generic-modal.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    SideMenuModule,
    PaginationModule,
    HttpClientModule,
    SnackbarModule,
    GenericModalModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

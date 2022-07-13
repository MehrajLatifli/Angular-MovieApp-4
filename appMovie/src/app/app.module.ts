import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { FooterComponent } from './footer/footer.component';
import { AlertifyService } from './services/alertify-service.service';
import { AppRoutingModule } from './Modules/app-routing.module';


import { AuthComponent } from './auth/auth.component';
import { RouterModule, CanActivate } from '@angular/router';
import { AuthGuardCanActivate } from './auth/guards/auth.guard';

import { AlertComponent } from './shared/alert/alert.component';
import { MoviesModule } from './movies/movies.module';
import { AuthInterceptor } from './auth/auth.interceptor.service';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,

    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    MoviesModule,
    AuthModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

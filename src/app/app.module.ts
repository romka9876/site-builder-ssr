// angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// libs
import { CookieService, CookieModule } from '@gorniv/ngx-universal';
import { TransferHttpCacheModule } from '@nguniversal/common';
// shared
import { SharedModule } from '@shared/shared.module';
import { AuthService } from '@shared/services/auth.service';
// components
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { UniversalStorage } from '@shared/storage/universal.storage';
// interceptors
import { TokenInterceptor } from '@shared/interceptors/token.interceptor';
import { ErrorInterceptor } from '@shared/interceptors/error.interceptor';
import { AuthGuard } from '@shared/guards/auth.guard';
import { UnAuthGuard } from '@shared/guards/un-auth.guard';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    TransferHttpCacheModule,
    HttpClientModule,
    RouterModule,
    AppRoutes,
    BrowserAnimationsModule,
    CookieModule.forRoot(),
    SharedModule.forRoot(),
  ],
  declarations: [AppComponent],
  providers: [
    CookieService,
    UniversalStorage,
    AuthService,
    // Guards
    AuthGuard,
    UnAuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
})
export class AppModule {
}

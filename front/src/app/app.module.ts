import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home/home.module';
import { NavigationModule } from './modules/navigation/navigation.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminModule } from './modules/admin/admin.module';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './modules/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  NgHttpCachingLocalStorage,
  NgHttpCachingModule,
  NgHttpCachingStrategy,
} from 'ng-http-caching';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HomeModule,
    NavigationModule,
    AdminModule,
    SharedModule,
    FontAwesomeModule,
    NgHttpCachingModule.forRoot({
      lifetime: 86400000,
      cacheStrategy: NgHttpCachingStrategy.DISALLOW_ALL,  // pas de cache sauf pour les users non loggés en get
      store: new NgHttpCachingLocalStorage(),
    }),
  ],
  exports: [AppRoutingModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

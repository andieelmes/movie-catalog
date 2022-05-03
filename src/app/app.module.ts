import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedModule } from 'src/app/shared.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { MainLayoutComponent } from 'src/app/main-layout/main-layout.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { MainNavigationComponent } from 'src/app/main-navigation/main-navigation.component';
import { LanguageSwitcherComponent } from 'src/app/language-switcher/language-switcher.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HeaderComponent,
    MainNavigationComponent,
    LanguageSwitcherComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
    }),
    MatToolbarModule,
    MatButtonModule,
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule { }

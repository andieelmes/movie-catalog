import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator'
import { MatChipsModule } from '@angular/material/chips';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './header/header.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';

import { ListComponent } from './list/list.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MovieComponent } from './movie/movie.component';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { FilterComponent } from './filter/filter.component';
import { PosterComponent } from './poster/poster.component';
import { CatalogComponent } from './catalog/catalog.component';
import { TagsComponent } from './tags/tags.component';

import { CustomMatPaginatorIntl } from 'src/intl/custom-mat-paginator-intl';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HeaderComponent,
    ListComponent,
    FavoritesComponent,
    MovieComponent,
    MainNavigationComponent,
    LanguageSwitcherComponent,
    FilterComponent,
    PosterComponent,
    CatalogComponent,
    TagsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatChipsModule,
  ],
  providers: [Title, { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }],
  bootstrap: [AppComponent]
})
export class AppModule { }

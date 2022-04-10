import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PosterComponent } from './poster/poster.component';
import { EmptyComponent } from './empty/empty.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { VisuallyHiddenComponent } from './visually-hidden/visually-hidden.component';

import { Duration } from './pipes/duration';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    PosterComponent,
    EmptyComponent,
    SpinnerComponent,
    VisuallyHiddenComponent,
    Duration,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      isolate: false,
    }),
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    PosterComponent,
    EmptyComponent,
    SpinnerComponent,
    VisuallyHiddenComponent,
    Duration,
    CommonModule,
    TranslateModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ]
})
export class SharedModule {}

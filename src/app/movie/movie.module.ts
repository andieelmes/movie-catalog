import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatChipsModule } from '@angular/material/chips';

import { SharedModule } from 'src/app/shared.module';

import { TagsComponent } from 'src/app/tags/tags.component';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieComponent } from './movie.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    MovieRoutingModule,
    MatChipsModule,
  ],
  declarations: [
    MovieComponent,
    TagsComponent,
  ],
})
export class MovieModule { }

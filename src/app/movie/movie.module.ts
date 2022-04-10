import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatChipsModule } from '@angular/material/chips';

import { SharedModule } from '../shared.module';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieComponent } from './movie.component';
import { TagsComponent } from '../tags/tags.component';

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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatChipsModule } from '@angular/material/chips';

import { SharedModule } from 'src/app/shared.module';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FavoritesRoutingModule,
    MatChipsModule,
  ],
  declarations: [
    FavoritesComponent,
  ],
})
export class FavoritesModule { }

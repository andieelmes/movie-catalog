import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared.module';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FavoritesRoutingModule,
  ],
  declarations: [
    FavoritesComponent,
  ],
})
export class FavoritesModule { }

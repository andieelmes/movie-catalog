import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared.module';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { CatalogComponent } from '../catalog/catalog.component';
import { FilterComponent } from '../filter/filter.component';

import { CustomMatPaginatorIntl } from 'src/intl/custom-mat-paginator-intl';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ListRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ListComponent,
    CatalogComponent,
    FilterComponent,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }],
})
export class ListModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared.module';

import { CatalogComponent } from 'src/app/catalog/catalog.component';
import { FilterComponent } from 'src/app/filter/filter.component';
import { CustomMatPaginatorIntl } from 'src/intl/custom-mat-paginator-intl';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';

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

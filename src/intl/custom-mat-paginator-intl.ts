import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateParser, TranslateService } from '@ngx-translate/core';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  private rangeLabelIntl?: string;
  private rangeEmptyIntl?: string;

  constructor(
    private translateService: TranslateService,
    private translateParser: TranslateParser
  ) {
    super();
    this.getTranslations();
  }

  getTranslations(): void {
    this.translateService.stream('paginator').subscribe(data => {
      this.itemsPerPageLabel = data.itemsPerPageLabel;
      this.nextPageLabel = data.nextPage;
      this.previousPageLabel = data.previousPage;
      this.rangeLabelIntl = data.range;
      this.rangeEmptyIntl = data.rangeEmpty;
      this.changes.next();
    });
  }

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0) {
      return this.translateParser.interpolate(this.rangeEmptyIntl!, { length });
    }
    const positiveLength = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < positiveLength ? Math.min(startIndex + pageSize, positiveLength) : startIndex + pageSize;

    return this.translateParser.interpolate(this.rangeLabelIntl!, { start: startIndex + 1, end: endIndex, length: positiveLength });
  };
}

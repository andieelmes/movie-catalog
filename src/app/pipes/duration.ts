import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import formatDuration from 'src/helpers/format-duration';
import { Plural } from 'src/helpers/get-plural';

@Pipe({name: 'duration'})
export class Duration implements PipeTransform {
  pluralHours?: Plural;
  pluralMinutes?: Plural;

  constructor(private translateService: TranslateService) { }

  transform(value: number): Observable<string> {
    return this.translateService.stream('duration')
      .pipe(
        map(data => formatDuration(value, data.hours, data.minutes))
      );
  }
}

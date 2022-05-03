import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { Duration } from './duration';

const MockTranslateService = {
  stream() {
    return of({
      hours: {
        many: "hours",
        one: "hour"
      },
      minutes: {
        many: "minutes",
        one: "minute"
      }
    });
  }
}

describe('DurationPipe', () => {
  let pipe: Duration;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: TranslateService, useValue: MockTranslateService },
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    pipe = new Duration(translateService);
  });

  it('transforms 0 minutes to nothing', async () => {
    pipe.transform(0).subscribe(value => {
      expect(value).toEqual('');
    })
  });

  it('transforms 1 minute to "1 minute"', async () => {
    pipe.transform(1).subscribe(value => {
      expect(value).toEqual('1 minute');
    })
  });

  it('transforms 2 minutes to "2 minutes"', async () => {
    pipe.transform(2).subscribe(value => {
      expect(value).toEqual('2 minutes');
    })
  });

  it('transforms 30 minutes to "30 minutes"', async () => {
    pipe.transform(30).subscribe(value => {
      expect(value).toEqual('30 minutes');
    })
  });

  it('transforms 60 minutes to "1 hour"', async () => {
    pipe.transform(60).subscribe(value => {
      expect(value).toEqual('1 hour');
    })
  });

  it('transforms 61 minutes to "1 hour 1 minute"', async () => {
    pipe.transform(61).subscribe(value => {
      expect(value).toEqual('1 hour 1 minute');
    })
  });

  it('transforms 180 minutes to "3 hours"', async () => {
    pipe.transform(180).subscribe(value => {
      expect(value).toEqual('3 hours');
    })
  });

  it('transforms 1806 minutes to "30 hours 6 minutes"', async () => {
    pipe.transform(1806).subscribe(value => {
      expect(value).toEqual('30 hours 6 minutes');
    })
  });
});

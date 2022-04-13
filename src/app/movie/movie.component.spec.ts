import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { SharedModule } from 'src/app/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { MovieService } from 'src/services/movie.service';
import { MovieComponent } from './movie.component';

import { mockMovie, mockDisplayedGenres, mockDisplayedProductionCompanies, mockDisplayedProductionCountries } from 'src/mocks/movie';

const MockMovieService = {
  getMovie() {
    return of(mockMovie);
  }
}

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule
          .withTranslations({})
          .withDefaultLanguage('en'),
        SharedModule,
        BrowserAnimationsModule,
      ],
      declarations: [MovieComponent],
      providers: [MovieComponent,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: MovieService, useValue: MockMovieService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
  });

  it('should load the movie', () => {
    expect(component.loading).toBeTrue();
    fixture.detectChanges();

    expect(component.loading).toBeFalse();
    expect(component.movie).toEqual(mockMovie)
  });

  it('should format displayed genres', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('.movie__genres');
    expect(element.textContent).toContain(mockDisplayedGenres);
  });

  it('should format displayed production companies', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('.movie__production-companies');
    expect(element.textContent).toContain(mockDisplayedProductionCompanies);
  });

  it('should format displayed production countries', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('.movie__production-countries');
    expect(element.textContent).toContain(mockDisplayedProductionCountries);
  });
});

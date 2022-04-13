import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { SharedModule } from 'src/app/shared.module';
import { MovieService } from 'src/services/movie.service';
import { of } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

import { ListComponent } from './list.component';

import { mockInitialMovies, mockGenres, mockSearchedMovies } from 'src/mocks/movie';

const MockMovieService = {
  getGenres() {
    return of(mockGenres);
  },
  getInitialMovies() {
    return of(mockInitialMovies);
  },
  searchMovies() {
    return of(mockSearchedMovies)
  }
}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule
          .withTranslations({})
          .withDefaultLanguage('en'),
        SharedModule,
      ],
      declarations: [ListComponent],
      providers: [ListComponent,
        { provide: MovieService, useValue: MockMovieService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load genres and initial movies', () => {
    expect(component.genres).toEqual(mockGenres);
    expect(component.movies).toEqual(mockInitialMovies);
  });

  it('should filter movies by selected genres', () => {
    component.selectGenres(mockGenres.map(genre => genre.id));
    expect(component.filteredMovies.length).toEqual(1);
  });

  it('should paginate movie list', () => {
    component.search('query');

    expect(component.filteredMovies.length).toEqual(mockSearchedMovies.length);
    expect(component.paginatedMovies.length).toEqual(Math.min(component.pageSize, mockSearchedMovies.length));

    const nextIndex = 1;
    component.handlePagination({ pageIndex: nextIndex } as PageEvent);
    expect(component.paginatedMovies.length).toEqual(Math.min(mockSearchedMovies.length - component.pageSize * nextIndex, component.pageSize));
    expect(component.pageIndex).toEqual(nextIndex);
  });
});

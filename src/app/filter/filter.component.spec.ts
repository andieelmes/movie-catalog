import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { of } from 'rxjs';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from 'src/app/shared.module';
import { Genre } from 'src/models/movie';
import locationParams from 'src/helpers/location-params';

import { FilterComponent } from './filter.component';

const genresFromParams = [12, 16, 100];
const queryParams = {
  genres: genresFromParams.join(','),
  query: 'star wars'
};

const genres: Genre[] = [{ id: 12, name: 'test' }, { id: 16, name: 'test2' }, { id: 17, name: 'test3'}];
const selectedGenres = genres.filter(genre => genresFromParams.includes(genre.id));

const displayedColumns = ['Test', 'Test2'];

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let loader: HarnessLoader;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule
          .withTranslations({})
          .withDefaultLanguage('en'),
        SharedModule,
        BrowserAnimationsModule,
      ],
      declarations: [FilterComponent],
      providers: [FilterComponent,
        { provide: ActivatedRoute, useValue: { queryParams: of(queryParams) }},
        { provide: Location, useClass: SpyLocation },
      ],
    })
    .compileComponents();

    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);

    component.genres = genres;
    component.displayedColumns = displayedColumns;
    component.columns = displayedColumns;
  });


  it('should fill out form from query params', async () => {
    const searchInput = await loader.getHarness(MatInputHarness);
    expect(await searchInput.getValue()).toBe(queryParams.query);

    const selects = await loader.getAllHarnesses(MatSelectHarness);
    const genreSelect = selects[1];
    await genreSelect.open();
    const options = await genreSelect.getOptions();
    expect(options.length).toEqual(genres.length)

    await Promise.all(options.map(async (option, index) => {
      const text = await option.getText();
      const isSelected = await option.isSelected();
      expect(text).toBe(genres[index].name);
      expect(isSelected).toBe(selectedGenres.some(genre => genre.name === text));
    }));
  });

  it('should set displayed columns', async () => {
    const selects = await loader.getAllHarnesses(MatSelectHarness);
    const columnsSelect = selects[0];
    await columnsSelect.open();
    const options = await columnsSelect.getOptions();
    expect(options.length).toEqual(displayedColumns.length)
  });

  it('should update query params on change', async () => {
    spyOn(location, 'go');

    const searchInput = await loader.getHarness(MatInputHarness);
    const newQuery = 's';
    await searchInput.setValue(newQuery);
    expect(component.params.query).toBe(newQuery);
    expect(location.go).toHaveBeenCalledWith('/', locationParams.combine({ query: newQuery, genres: genresFromParams }));

    const genreIds = genres.map(genre => genre.id);
    const selects = await loader.getAllHarnesses(MatSelectHarness);
    const genreSelect = selects[1];
    await genreSelect.open();

    const options = await genreSelect.getOptions();
    await Promise.all(options.map(async (option, index) => {
      const text = await option.getText();
      const isSelected = await option.isSelected();

      if (!isSelected) {
        await genreSelect.clickOptions({ text });
      }
    }));

    expect(options.length).toEqual(genres.length)
    expect(component.params.genres).toEqual(genreIds);

    expect(location.go).toHaveBeenCalledWith('/', locationParams.combine({ query: newQuery, genres: genreIds }));;
  });
});

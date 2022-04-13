import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from 'src/app/shared.module';
import { FavoriteService } from 'src/services/favorite.service';

import { FavoritesComponent } from './favorites.component';

const favoriteMovie = {
  id: 1234,
  title: 'Movie Title',
  tags: ['tag'],
};

class MockFavoriteService {
  getData =() => [favoriteMovie];
}

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let favoriteService;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule
          .withTranslations({})
          .withDefaultLanguage('en'),
        SharedModule,
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
      providers: [FavoritesComponent, { provide: FavoriteService, useClass: MockFavoriteService }],
      declarations: [FavoritesComponent]
    })
    .compileComponents();

    favoriteService = TestBed.inject(FavoriteService);
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should load tags', async () => {
    const select = await loader.getHarness(MatSelectHarness);
    await select.open();
    const options = await select.getOptions();
    expect(await options[0].getText()).toBe(favoriteMovie.tags[0]);
  });

  it('should display movie with selected tag', async () => {
    expect(document.querySelector('.favorites__movie')).toBeFalsy();

    const select = await loader.getHarness(MatSelectHarness);
    await select.open();
    const options = await select.getOptions();
    await options[0].click();

    expect(await select.getValueText()).toBe(favoriteMovie.tags[0]);
    expect(document.querySelectorAll('.favorites__movie').length).toEqual(1);
    expect(document.querySelector('.favorites__movie-link')?.innerHTML).toContain(favoriteMovie.title);
    expect(document.querySelector('.favorites__movie-tags')?.innerHTML).toContain(favoriteMovie.tags[0]);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { of } from 'rxjs';

import { languageStorageName } from 'src/app/language';

import { AppComponent } from './app.component';

const testTitle = 'test title';

const MockTranslateService = {
  setDefaultLang(value: string) {
    localStorage.setItem(languageStorageName, value)
  },
  use() {},
  stream() {
    return of(testTitle);
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let title: Title;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateTestingModule
          .withTranslations({})
          .withDefaultLanguage('en'),
      ],
      declarations: [AppComponent],
      providers: [
        AppComponent,
        { provide: TranslateService, useValue: MockTranslateService },
        { provide: Title },
      ],
    }).compileComponents();

    title = TestBed.inject(Title);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set title', () => {
    expect(title.getTitle()).toEqual(testTitle)
  });
});

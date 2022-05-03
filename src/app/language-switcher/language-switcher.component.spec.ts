import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { TranslateService } from '@ngx-translate/core';

import { LanguageSwitcherComponent } from './language-switcher.component';

class MockTranslateService {
  currentLang = 'en';
  use = () => {}
}

describe('LanguageSwitcherComponent', () => {
  let component: LanguageSwitcherComponent;
  let fixture: ComponentFixture<LanguageSwitcherComponent>;
  let translateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanguageSwitcherComponent],
      providers: [LanguageSwitcherComponent, { provide: TranslateService, useClass: MockTranslateService }],
      imports: [MatButtonModule]
    })
    .compileComponents();

    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(LanguageSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set current lang based on translation service', () => {
    component.ngOnInit();
    expect(component.currentLang).toBe('en');
  });

  it('should update current language', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button[data-language="ru"]');
    expect(button).toBeTruthy();
    button.click();

    expect(component.currentLang).toBe('ru');
    expect(localStorage.getItem('_current_language')).toBe('ru');
  });
});

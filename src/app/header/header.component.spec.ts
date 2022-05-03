import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MainNavigationComponent } from 'src/app/main-navigation/main-navigation.component';
import { LanguageSwitcherComponent } from 'src/app/language-switcher/language-switcher.component';

import { HeaderComponent } from './header.component';

const mockBreakpointObserver = {
  observe() { return of({ matches: false }) },
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule
          .withTranslations({})
          .withDefaultLanguage('en'),
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        RouterTestingModule,
      ],
      declarations: [
        HeaderComponent,
        LanguageSwitcherComponent,
        MainNavigationComponent,
      ],
      providers: [{ provide: BreakpointObserver, useValue: mockBreakpointObserver }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should respond to window resize', async () => {
    expect(component.isMobile).toBe(false);

    fixture.detectChanges();
    expect(component.isMobile).toBe(true);
  });

  it('should open mobile menu', async () => {
    fixture.detectChanges();
    expect(component.isMobile).toBe(true);

    const button = fixture.debugElement.nativeElement.querySelector('[aria-label="toggleMenu"]');
    expect(button).toBeTruthy();
    button.click();
    expect(component.isMenuOpen).toBe(true);
  });
});

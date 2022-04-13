import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainNavigationComponent } from './main-navigation.component';

new NavigationEnd(0, '/home', '/favorites')

class MockRouter {
  url = '/';
  events = of(new NavigationEnd(0, '/favorites', '/favorites'));
}

describe('MainNavigationComponent', () => {
  let component: MainNavigationComponent;
  let fixture: ComponentFixture<MainNavigationComponent>;
  let router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule
          .withTranslations({})
          .withDefaultLanguage('en'),
        SharedModule,
        BrowserAnimationsModule,
      ],
      declarations: [MainNavigationComponent],
      providers: [MainNavigationComponent,
        { provide: Router, useClass: MockRouter },
      ],
    })
    .compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(MainNavigationComponent);
    component = fixture.componentInstance;
  });

  it('should set current active url', () => {
    expect(component.activeItemUrl).toBe('/');
  });

  it('should set active url on change', () => {
    fixture.detectChanges();

    expect(component.activeItemUrl).toBe('/favorites');
  });
});

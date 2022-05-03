import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

import localStorage from 'src/helpers/local-storage';
import { defaultLanguage, languageStorageName } from 'src/app/language';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private translateService: TranslateService,
    private titleService: Title,
  ) {
    this.translateService.setDefaultLang(defaultLanguage);
    const currentLang = localStorage.get(languageStorageName) || defaultLanguage;
    this.translateService.use(currentLang);

    this.translateService.stream('title').subscribe(title =>  this.titleService.setTitle(title))
  }
}

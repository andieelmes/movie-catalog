import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

import { defaultLanguage } from './language';

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
    this.translateService.use(defaultLanguage);

    this.translateService.stream('title').subscribe(title =>  this.titleService.setTitle(title))
  }
}

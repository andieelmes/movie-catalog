import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { defaultLanguage } from './language';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movie-catalog';

  constructor(translateService: TranslateService) {
    translateService.setDefaultLang(defaultLanguage);
    translateService.use(defaultLanguage);
}
}

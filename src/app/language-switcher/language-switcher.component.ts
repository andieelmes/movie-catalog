import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import localStorage from 'src/helpers/local-storage';
import { languages, Language, defaultLanguage, languageStorageName } from 'src/app/language';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent implements OnInit {
  currentLang: Language = defaultLanguage;

  languages = languages;

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.setCurrentLang();
  }

  setCurrentLang(): void {
    this.currentLang = this.translateService.currentLang as Language;
  }

  updateCurrentLang(lang: string): void {
    this.currentLang = lang as Language;
    localStorage.set(languageStorageName, lang);
    this.translateService.use(lang);
  }
}

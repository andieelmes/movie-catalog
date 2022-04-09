import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { languages, Language, defaultLanguage } from '../language';

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
    this.translateService.use(lang);
  }
}

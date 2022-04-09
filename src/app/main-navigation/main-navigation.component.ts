import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

interface MenuItem {
  id: string,
  url: string,
  title: string,
}

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit {
  @Input() isMobile = false;

  @Output() select = new EventEmitter();

  items: MenuItem [] = [
    {
      id: 'home',
      url: '/',
      title: 'Home',
    },
    {
      id: 'favorites',
      url: '/favorites',
      title: 'Favorite Movies',
    }
  ]

  activeItemUrl?: MenuItem['url'] = this.router.url;

  constructor(
    private router: Router,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.setActiveItem();
    this.setTranslation();
  }

  setActiveItem(): void {
    this.router.events
      .subscribe((routerEvent) => {
        if (routerEvent instanceof NavigationEnd) {
          const activeItem = this.items.find(({ url }) => url === routerEvent.url);
          this.activeItemUrl = activeItem?.url;
        }
      });
  }

  setTranslation(): void {
    this.translateService.stream('navigation').subscribe(data => {
      this.items = this.items.map(item => ({...item, title: data[item.id] }));
    });
  }
}

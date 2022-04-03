import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';

interface MenuItem {
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
      url: '/',
      title: 'Home',
    },
    {
      url: '/favorites',
      title: 'Favorite Movies',
    }
  ]

  activeItemUrl?: MenuItem['url'] = this.router.url;

  constructor( private router: Router ) { }

  ngOnInit(): void {
    this.setActiveItem();
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
}

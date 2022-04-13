import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

const Mobile = 900;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private breakpointObserver: BreakpointObserver ) { }

  isMobile: boolean = false;

  isMenuOpen: boolean = false;

  ngOnInit(): void {
    this.setMobile();
  }

  setMobile(): void {
    this.breakpointObserver.observe(`(min-width: ${Mobile}px)`).subscribe(( { matches }) => {
      this.isMobile = !matches;
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

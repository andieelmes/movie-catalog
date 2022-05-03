import { Component, Input } from '@angular/core';

type Size = 'table' | 'detail';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss']
})
export class PosterComponent {
  @Input() src?: string;
  @Input() alt?: string;
  @Input() size?: Size;
}

import { Component, Input, OnInit } from '@angular/core';
import { MovieInfo } from 'src/app/models/movie';
import { CardInfoService } from 'src/app/services/card-info/card-info.service';

@Component({
  selector: 'app-card-focus',
  templateUrl: './card-focus.component.html',
  styleUrls: ['./card-focus.component.css'],
})
export class CardFocusComponent implements OnInit {
  @Input() movie!: MovieInfo;
  constructor(private cardInfoService: CardInfoService) {}

  ngOnInit() {}

  handleQuitCardFocus(element: HTMLElement, event: Event): void {
    if (event.target == element) {
      this.cardInfoService.movieFocusHandler(undefined);
    }
    document.querySelector('body')?.classList.remove('focusCard');
  }
}
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { MovieInfo } from 'src/app/models/movie';
import { CardInfoService } from 'src/app/services/card-info/card-info.service';

@Component({
  selector: 'app-card-focus',
  templateUrl: './card-focus.component.html',
  styleUrls: ['./card-focus.component.css'],
})
export class CardFocusComponent implements OnInit {
  cardFocusInfo!: MovieInfo;
  constructor(private cardInfoService: CardInfoService) {}

  ngOnInit() {
    this.cardInfoService.CardFocus$.subscribe({
      next: (data) => {
        this.cardFocusInfo = data;
      },
    });
  }

  handleQuitCardFocus(element: HTMLElement, event: Event): void {
    if (event.target == element) {
      this.cardInfoService.CardFocus$ = of();
    }
    document.querySelector('body')?.classList.remove('focusCard');
  }
}

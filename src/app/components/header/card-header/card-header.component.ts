import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { MovieInfo } from 'src/app/models/movie';
import { CardInfoService } from 'src/app/services/card-info/card-info.service';
import { translateIn, translateOut } from './card-header.animations';

@Component({
  selector: 'app-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.css'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        useAnimation(translateIn, { params: { time: '1300ms' } }),
      ]),
      transition('* => void', [
        useAnimation(translateOut, { params: { time: '1300ms' } }),
      ]),
    ]),
  ],
})
export class CardHeaderComponent implements OnInit, OnDestroy {
  constructor(public cardInfoService: CardInfoService) {}
  
  @Input() movies!: MovieInfo[];
  @Input() indicators: boolean = true;
  index: number = 0;
  interval!: any;

  ngOnInit() {
    if (this.indicators) {
      this.cardInfoService.index = this.index;
      this.mouseLeave();
    }
  }

  ngOnDestroy(): void {
    console.log('destroy');
    
    clearInterval(this.interval);
  }

  carousselIndex(index: number): void {
    console.log('click');
    this.cardInfoService.index = index;
    this.index = index;
  }

  mouseEnter(): void {
    console.log('enter');
    clearInterval(this.interval);
  }

  mouseLeave(): void {
    this.interval = setInterval(() => {
      this.carousselLoop();
    }, 5000);
  }

  carousselLoop(): void {
    if (this.index + 1 < 5) {
      this.index++;
      this.carousselIndex(this.index);
      return;
    }
    this.index = 0;
    this.carousselIndex(this.index);
  }
}

import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { CardInfoService } from 'src/app/services/card-info/card-info.service';
import { fadeIn, fadeOut } from './card-header.animations';

@Component({
  selector: 'app-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.css'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        useAnimation(fadeIn, { params: { time: '1300ms' } }),
      ]),
      transition('* => void', [
        useAnimation(fadeOut, { params: { time: '1300ms' } }),
      ]),
    ]),
  ],
})
export class CardHeaderComponent implements OnInit {
  constructor(public cardInfoService: CardInfoService) {}
  @Input() image!: string;
  @Input() indicators: boolean = true;
  index: number = 0;
  transition: boolean = false;

  images = [
    'header1.webp',
    'header2.webp',
    'header3.webp',
    'header4.webp',
    'header5.webp',
  ];

  titles = [
    'title26.webp',
    'title27.webp',
    'title28.webp',
    'title29.webp',
    'title30.webp',
  ];
  interval!: any;

  ngOnInit() {
    // if (this.indicators) {
      this.mouseLeave();
    // }
  }

  carousselIndex(index: number): void {
    console.log('click');
    this.transition = true;
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
      this.index++;
      if (this.index < 5) {
        this.carousselIndex(this.index);
        console.log(this.index);
        return;
      }
      this.index = 0;
      this.carousselIndex(this.index);
      console.log(this.index);
  }

  
}

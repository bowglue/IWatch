import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.css']
})
export class CardHeaderComponent implements OnInit {
  images = [ "header1.webp", "header2.webp", "header3.webp" , "header4.webp", "header5.webp"];
  constructor(config: NgbCarouselConfig) {
    config.interval = 5000;
    config.showNavigationArrows = false;
   }

  ngOnInit() {
    // this.images = this.randomArrayShuffle(this.images);
  }

  randomArrayShuffle(array: Array<any>) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}

import { Component, OnInit } from '@angular/core';
import { CardInfoService } from 'src/app/services/card-info/card-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public cardInfoService: CardInfoService) {}

  ngOnInit() {
    // this.cardInfoService.cardFocus$ = this.cardInfoService.cardFocusSubject$;
  }
}

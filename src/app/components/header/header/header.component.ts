import { Component, OnInit } from '@angular/core';
import { CardInfoService } from 'src/app/services/card-info/card-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private cardInfoService: CardInfoService) {}
  moviesHeader$ = this.cardInfoService.getHeaderImage(5,5);
  ngOnInit() {}
}

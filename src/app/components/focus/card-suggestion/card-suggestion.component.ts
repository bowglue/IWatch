import { Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { MovieInfo } from 'src/app/models/movie';
import { CardInfoService } from 'src/app/services/card-info/card-info.service';

@Component({
  selector: 'app-card-suggestion',
  templateUrl: './card-suggestion.component.html',
  styleUrls: ['./card-suggestion.component.css'],
})
export class CardSuggestionComponent implements OnInit {
  @Input() moviesSuggestion!: MovieInfo[];
  constructor(public cardInfoService: CardInfoService) {}
  ngOnInit() {}

 
}

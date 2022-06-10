import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  concatMap,
  first,
  map,
  Observable,
  shareReplay,
  startWith,
  Subject,
  Subscription,
  tap,
} from 'rxjs';
import { CardsliderComponent } from 'src/app/components/slider/cardslider/cardslider.component';
import { MovieInfo } from 'src/app/models/movie';

@Injectable({
  providedIn: 'root',
})
export class CardInfoService {
  cardMute: boolean = false;
  CardFocus$!: Observable<MovieInfo>;
  cardsPerPage: number = 5;
  subscribe!: Subscription;
  moviesSub!: Subscription;

  constructor(private httpClient: HttpClient) {}

  private muteSubject = new BehaviorSubject<boolean>(false);
  muteSubject$ = this.muteSubject.asObservable();

  movies$ = this.getMovieInfo(0, 2 * this.cardsPerPage);

  muteChangeHandler(): void {
    this.muteSubject.next((this.cardMute = !this.cardMute));
  }

  getMovieInfo(page: number, numberMovie: number): Observable<MovieInfo[]> {
    const request = this.httpClient
      .get<MovieInfo[]>('/server/api/v1/movie/image', {
        params: { page, numberMovie },
      })
      .pipe(shareReplay(1));
    return request;
  }

  getMovieTrailer(movieId: number, segmentId: number): Observable<Blob> {
    const request = this.httpClient.get('/server/api/v1/trailer/segment', {
      params: { movieId, segmentId },
      responseType: 'blob',
    });
    return request;
  }
}

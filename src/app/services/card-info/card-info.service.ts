import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  concatMap,
  map,
  Observable,
  of,
  shareReplay,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { MovieInfo } from 'src/app/models/movie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CardInfoService {
  baseUrl: string = environment.baseUrl;
  cardMute: boolean = true;
  cardsPerPage: number = 5;
  index: number = 0;

  constructor(private httpClient: HttpClient) {}

  private muteSubject = new BehaviorSubject<boolean>(this.cardMute);
  muteSubject$ = this.muteSubject.asObservable();

  movies$ = this.getMovieInfo(0, 2 * this.cardsPerPage);

  private cardFocusSubject = new Subject<MovieInfo | undefined>();
  cardFocusSubject$ = this.cardFocusSubject.pipe(
    concatMap((movie) =>
      movie == undefined
        ? of(undefined)
        : this.getFocusImage(movie.movie_id).pipe(
            map(
              (movieFocus) =>
                ({
                  ...movie,
                  movie_focus: movieFocus.movie_focus,
                } as MovieInfo)
            )
          )
    )
  );

  movieFocusHandler(movie: MovieInfo | undefined): void {
    this.cardFocusSubject.next(movie);
  }

  muteChangeHandler(): void {
    this.muteSubject.next((this.cardMute = !this.cardMute));
  }

  getMovieInfo(page: number, numberMovie: number): Observable<MovieInfo[]> {
    const request = this.httpClient.get<MovieInfo[]>(
      this.baseUrl + '/api/v1/movie/image',
      {
        params: { page, numberMovie },
      }
    );
    return request;
  }

  getMovieTrailer(movieId: number, segmentId: number): Observable<Blob> {
    const request = this.httpClient.get(
      this.baseUrl + '/api/v1/trailer/segment',
      {
        params: { movieId, segmentId },
        responseType: 'blob',
      }
    );
    return request;
  }

  getFocusImage(id: number): Observable<MovieInfo> {
    const request = this.httpClient
      .get<MovieInfo>(this.baseUrl + '/api/v1/movie/focus/' + id)
      .pipe(shareReplay(1));

    return request;
  }

  getHeaderImage(page: number, numberMovie: number): Observable<MovieInfo[]> {
    const request = this.httpClient
      .get<MovieInfo[]>(this.baseUrl + '/api/v1/movie/header', {
        params: { page, numberMovie },
      })
      .pipe(shareReplay(1));

    return request;
  }
}

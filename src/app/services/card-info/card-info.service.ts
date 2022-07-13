import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  concatMap, map,
  Observable,
  of, Subject,
  Subscription
} from 'rxjs';
import { MovieInfo } from 'src/app/models/movie';

@Injectable({
  providedIn: 'root',
})
export class CardInfoService {
  cardMute: boolean = false;
  cardsPerPage: number = 5;
  subscribe!: Subscription;
  moviesSub!: Subscription;
  constructor(private httpClient: HttpClient) {}

  private muteSubject = new BehaviorSubject<boolean>(false);
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
    ),
  );

  movieFocusHandler(movie: MovieInfo | undefined): void {
    this.cardFocusSubject.next(movie);
  }

  muteChangeHandler(): void {
    this.muteSubject.next((this.cardMute = !this.cardMute));
  }

  getMovieInfo(page: number, numberMovie: number): Observable<MovieInfo[]> {
    const request = this.httpClient
      .get<MovieInfo[]>('/server/api/v1/movie/image', {
        params: { page, numberMovie },
      })
      .pipe(/*shareReplay(1)*/);
    return request;
  }

  getMovieTrailer(movieId: number, segmentId: number): Observable<Blob> {
    const request = this.httpClient.get('/server/api/v1/trailer/segment', {
      params: { movieId, segmentId },
      responseType: 'blob',
    });
    return request;
  }

  getFocusImage(id: number): Observable<MovieInfo> {
    const request = this.httpClient.get<MovieInfo>(
      '/server/api/v1/movie/focus/' + id
    );
    return request;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  concatMap,
  map, Observable,
  of,
  shareReplay,
  Subject
} from 'rxjs';
import { MovieFocus, MovieInfo } from 'src/app/models/movie';
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
        : this.getFocusAndRecommendation(movie.movie_id).pipe(
            map(
              (Focus) =>
                ({
                  movieFocus: ({
                    ...movie,
                    movie_focus: Focus.movieFocus.movie_focus,
                  }),
                  movieSuggestion: Focus.movieSuggestion
                } as MovieFocus)
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

  getFocusAndRecommendation(id: number): Observable<MovieFocus> {
    const request = this.httpClient
      .get<MovieFocus>(this.baseUrl + '/api/v1/movie/focus/' + id)
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

  getSuggestionMovie(id: number): Observable<MovieInfo[]> {
    const request = this.httpClient.get<MovieInfo[]>(
      this.baseUrl + '/api/v1/movie/more/' + id
    );
    return request;
  }
}

import { Component, OnInit } from '@angular/core';
import {
  combineLatest,
  concatMap,
  EMPTY,
  forkJoin,
  map,
  merge,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  tap,
  timer,
  zip,
} from 'rxjs';
import { MovieInfo } from 'src/app/models/movie';
import { CardInfoService } from 'src/app/services/card-info/card-info.service';
import { SliderController } from './slidercontroller';
import { SliderEntry } from './sliderentry';
import { SliderNext } from './slidernext';

@Component({
  selector: 'app-cardslider',
  templateUrl: './cardslider.component.html',
  styleUrls: ['./cardslider.component.css'],
})
export class CardsliderComponent implements OnInit {
  constructor(private cardInfoService: CardInfoService) {}

  sliderMovieInfo: MovieInfo[] = [];

  cardsPerPage: number = this.cardInfoService.cardsPerPage;
  pagePosition: string = '0%';
  isSlidingItems: boolean = false;
  translateLength: number = -(100 + 100 / this.cardsPerPage);
  cardWidth: string = `${100 / this.cardsPerPage}%`;
  pages: boolean[] = Array(Math.floor(25 / this.cardsPerPage)).fill(false);
  page: number = 0;

  sliderController!: SliderController;

  ngOnInit() {
    this.sliderController = new SliderEntry(this).getNewInstance();
  }

  initializeMovie$ = this.cardInfoService
    .movies$
    .pipe(
      tap((movies) => {
        this.pages[0] = true;
        this.pages[1] = true;
        this.sliderMovieInfo = [...movies];
      }),
      shareReplay(1)
    );

  slideItem = new Subject<number>();
  slideItem$ = this.slideItem.asObservable().pipe(
    tap((page) => this.translatePage(page)),
    concatMap((page) => timer(1100).pipe(map((val) => page))),
    tap((page) => this.resetContentPosition(page)),
    startWith(EMPTY)
  );

  nextMovies = new Subject<number[]>();
  nextMovies$ = this.nextMovies.asObservable().pipe(
    concatMap((page) =>
      this.cardInfoService
        .getMovieInfo(page[0], this.cardsPerPage)
        .pipe(map((movies) => ({ movies, page })))
    ),
    tap((movies) => {
      this.setNextMovies(movies.movies, movies.page[1]);
    }),
    startWith(EMPTY)
  );

  renderMovie$ = combineLatest([
    this.initializeMovie$,
    this.nextMovies$,
    this.slideItem$,
  ]);

  changePage(incrementor: number): void {
    this.isSlidingItems = true;
    this.slideItem.next(incrementor);

    const nextIndex =
      incrementor > 0
        ? (this.page + incrementor + 1) % this.pages.length
        : (this.page + incrementor + this.pages.length - 1) % this.pages.length;

    this.page =
      incrementor > 0
        ? (nextIndex + this.pages.length - 1) % this.pages.length
        : (nextIndex + 1) % this.pages.length;

    if (!this.pages[nextIndex]) {
      this.pages[nextIndex] = true;
      this.nextMovies.next([nextIndex, incrementor]);
    }
  }

  setNextMovies(nextMovies: MovieInfo[], incrementor: number): void {
    this.sliderController.setNextMovies(nextMovies, incrementor);
  }

  translatePage(incrementor: number): void {
    this.sliderController.translatePage(incrementor);
  }

  resetContentPosition(incrementor: number): void {
    this.sliderController.resetContentPosition(incrementor);
  }

  handleUpdateRenderImage(num: number) {
    this.sliderController.handleUpdateRenderImage(num);
  }

  updateRenderImageRight() {
    this.sliderController.updateRenderImageRight();
  }

  updateRenderImageLeft() {
    this.sliderController.updateRenderImageLeft();
  }

  scaleOrigin(i: number): string {
    return this.sliderController.scaleOrigin(i);
  }

  sliderState(): boolean {
    return this.sliderController instanceof SliderNext;
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

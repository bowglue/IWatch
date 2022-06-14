import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  combineLatest,
  concatMap,
  fromEvent,
  map,
  of,
  Subject,
  switchMap,
  tap,
  timer
} from 'rxjs';
import { MovieInfo } from 'src/app/models/movie';
import { CardInfoService } from 'src/app/services/card-info/card-info.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit, AfterViewInit {
  constructor(public cardInfoService: CardInfoService) {}

  @ViewChild('videoPlayer', { static: false }) videoplayer!: ElementRef;
  @ViewChild('card', { static: false }) card!: ElementRef;

  @Input() movie!: MovieInfo;
  @Input() scaleOrigin!: string;

  isLocalCardActive: boolean = false;
  isVideoActive: boolean = false;
  sourceBuffer!: SourceBuffer;
  mediaSource!: MediaSource;
  segment!: number;
  segmentEndTime!: number;
  videoEndTime!: number;
  isAddSegment: boolean = false;
  isEndOfStream: boolean = false;
  mute: boolean = false;
  muteImageSrc!: string;

  ngOnInit() {}

  ngAfterViewInit() {
    const mouseEnter$ = fromEvent(this.card.nativeElement, 'mouseenter')
      .pipe(map((val) => true))
      .subscribe((val) => {
        this.cardHoverSubject.next(val);
      });

    const mouseLeave$ = fromEvent(this.card.nativeElement, 'mouseleave')
      .pipe(map((val) => false))
      .subscribe((val) => {
        this.cardHoverSubject.next(val);
      });
    this.videoListener();
  }

  cardHoverSubject = new Subject<Boolean>();
  cardHoverSubject$ = this.cardHoverSubject.asObservable().pipe(
    switchMap((val) => (val ? timer(300).pipe(map((val) => true)) : of(false))),
    tap((val) => {
      this.cardStateChange(val);
    })
  );

  mediaSourceSubject = new Subject<Boolean>();
  mediaSourceSubject$ = this.mediaSourceSubject.asObservable().pipe(
    tap((val) => {
      this.mediaSource = new MediaSource();
      var url = URL.createObjectURL(this.mediaSource);
      this.videoplayer.nativeElement.src = url;
      this.isEndOfStream = false;
    }),
    switchMap((val) => {
      return fromEvent(this.mediaSource, 'sourceopen').pipe(
        tap(() => {
          this.sourceBuffer = this.mediaSource.addSourceBuffer(
            `video/webm; codecs="vp9,opus"`
          );
          this.segment = 1;
          this.segmentEndTime = 0;
          this.videoEndTime = 0;
          this.videoSegment.next(this.segment++);
        })
      );
    })
  );

  videoSegment = new Subject<number>();
  videoSegment$ = this.videoSegment.asObservable().pipe(
    switchMap((segment) => {
      return this.cardInfoService.getMovieTrailer(
        this.movie.movie_id,
        segment++
      );
    }),
    tap(async (data) => {
      if (this.isLocalCardActive) {
        const videoBuff = await data.arrayBuffer();
        this.sourceBuffer.appendBuffer(videoBuff);
        this.isAddSegment = true;
      }
    })
  );

  cardStateChange(isCardActive: boolean): void {
    this.isLocalCardActive = isCardActive;
    if (isCardActive) {
      this.mediaSourceSubject.next(true);
      this.card.nativeElement.style.zIndex = '1';
      return;
    }
    this.videoplayer.nativeElement.pause();
    setTimeout(() => {
      this.card.nativeElement.style.zIndex = '0';
    }, 300);
  }

  videoListener(): void {
    const canPlay$ = fromEvent(this.videoplayer.nativeElement, 'canplay').pipe(
      tap((val) => {
        if (this.isLocalCardActive) {
          this.videoplayer.nativeElement.play();
        }
      }),
      concatMap((data) => play$)
    );

    const play$ = fromEvent(this.videoplayer.nativeElement, 'play').pipe(
      tap((val) => {
        this.videoEndTime = Math.floor(this.mediaSource.duration);
        this.isVideoActive = true;
      })
    );

    const progress$ = fromEvent(
      this.videoplayer.nativeElement,
      'progress'
    ).pipe(
      tap((val) => {
        if (this.isLocalCardActive) {
          this.segmentEndTime = this.videoplayer.nativeElement.buffered.end(0);
          this.isAddSegment = false;
        }
      }),
      concatMap((data) => timeUpdate$)
    );

    const timeUpdate$ = fromEvent(
      this.videoplayer.nativeElement,
      'timeupdate'
    ).pipe(
      tap({
        next: () => {
          const currTime = this.videoplayer.nativeElement.currentTime;
          if (
            currTime >= 0.4 * this.segmentEndTime &&
            !this.isAddSegment &&
            Math.ceil(this.segmentEndTime) < this.videoEndTime
          ) {
            this.isAddSegment = true;
            this.videoSegment.next(this.segment++);
          }

          if (
            Math.ceil(this.segmentEndTime) >= this.videoEndTime &&
            this.mediaSource.readyState == 'open' &&
            !this.isEndOfStream
          ) {
            this.isEndOfStream = true;
            this.mediaSource.endOfStream();
          }
        },
      })
    );

    const pause$ = fromEvent(this.videoplayer.nativeElement, 'pause').pipe(
      tap(() => {
        if (this.mediaSource.readyState == 'open') {
          this.mediaSource.endOfStream();
        }
        this.isVideoActive = false;
        this.mediaSource.removeSourceBuffer(this.sourceBuffer);
      })
    );

    combineLatest([
      this.cardHoverSubject$,
      this.videoSegment$,
      this.mediaSourceSubject$,
      canPlay$,
      progress$,
      pause$,
    ]).subscribe();
  }

  mute$ = this.cardInfoService.muteSubject$.pipe(
    tap((val) => {
      this.mute = val;
    })
  );

  test(): void {
    this.mute = this.cardInfoService.cardMute;
  }
  muteHandler(): void {
    this.cardInfoService.muteChangeHandler();
  }

  handleCardFocus(movie: MovieInfo) {
    this.cardInfoService.movieFocusHandler(movie);
    document.querySelector('body')?.classList.add('focusCard');
  }
}

import { MovieInfo } from 'src/app/models/movie';
import { CardsliderComponent } from './cardslider.component';
import { SliderController } from './slidercontroller';

export class SliderNext extends SliderController {
  constructor(public override cardSliderComponent: CardsliderComponent) {
    super(cardSliderComponent);
  }

  public getNewInstance(): SliderController {
    return new SliderNext(this.cardSliderComponent);
  }

  override translatePage(incrementor: number): void {
    console.log('slider next');
    this.cardSliderComponent.pagePosition = `translate3d(${
      this.cardSliderComponent.translateLength - 100 * incrementor
    }%, 0px, 0px)`;
  }

  override setNextMovies(nextMovies: MovieInfo[], incrementor: number): void {
    if (incrementor > 0) {
      this.cardSliderComponent.sliderMovieInfo = [
        ...this.cardSliderComponent.sliderMovieInfo.slice(
          0,
          3 * this.cardSliderComponent.cardsPerPage + 1
        ),
        ...nextMovies,
        ...this.cardSliderComponent.sliderMovieInfo.slice(
          3 * this.cardSliderComponent.cardsPerPage + 1,
          this.cardSliderComponent.sliderMovieInfo.length
        ),
      ];
      return;
    }
    
    this.cardSliderComponent.sliderMovieInfo = [
      nextMovies[nextMovies.length - 1],
      ...this.cardSliderComponent.sliderMovieInfo.slice(
        1,
        this.cardSliderComponent.sliderMovieInfo.length - 1
      ),
      ...nextMovies.slice(0, this.cardSliderComponent.cardsPerPage - 1),

      nextMovies[nextMovies.length - 1],
      this.cardSliderComponent.sliderMovieInfo[1],
    ];
  }

  override resetContentPosition(incrementor: number): void {
    this.cardSliderComponent.isSlidingItems = false;
    this.cardSliderComponent.sliderMovieInfo =
      this.cardSliderComponent.sliderMovieInfo.slice(
        1,
        this.cardSliderComponent.sliderMovieInfo.length - 1
      );
    this.handleUpdateRenderImage(incrementor);
    this.cardSliderComponent.pagePosition = `translate3d(${this.cardSliderComponent.translateLength}%, 0px, 0px)`;
  }

  override handleUpdateRenderImage(num: number): void {
    if (num > 0) {
      this.updateRenderImageRight();
    } else {
      this.updateRenderImageLeft();
    }

    this.cardSliderComponent.sliderMovieInfo = [
      this.cardSliderComponent.sliderMovieInfo[
        this.cardSliderComponent.sliderMovieInfo.length - 1
      ],
      ...this.cardSliderComponent.sliderMovieInfo,
      this.cardSliderComponent.sliderMovieInfo[0],
    ];
  }

  override updateRenderImageRight(): void {
    this.cardSliderComponent.sliderMovieInfo =
      this.cardSliderComponent.sliderMovieInfo.concat(
        this.cardSliderComponent.sliderMovieInfo.splice(
          0,
          this.cardSliderComponent.cardsPerPage
        )
      );
  }

  override updateRenderImageLeft(): void {
    this.cardSliderComponent.sliderMovieInfo =
      this.cardSliderComponent.sliderMovieInfo.concat(
        this.cardSliderComponent.sliderMovieInfo.splice(
          0,
          this.cardSliderComponent.sliderMovieInfo.length -
            this.cardSliderComponent.cardsPerPage
        )
      );
  }

  override scaleOrigin(i: number): string {
    switch (i) {
      case this.cardSliderComponent.cardsPerPage + 1:
        return '0% 50%';

      case 2 * this.cardSliderComponent.cardsPerPage:
        return '100% 50%';

      default:
        return '50% 50%';
    }
  }
}

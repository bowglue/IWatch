import { MovieInfo } from 'src/app/models/movie';
import { CardsliderComponent } from './cardslider.component';
import { SliderController } from './slidercontroller';
import { SliderNext } from './slidernext';

export class SliderEntry extends SliderController {
  constructor(public override cardSliderComponent: CardsliderComponent) {
    super(cardSliderComponent);
  }

  width: number = 100 / this.cardSliderComponent.cardsPerPage;

  public getNewInstance(): SliderController {
    return new SliderEntry(this.cardSliderComponent);
  }

  override translatePage(incrementor: number): void {
    console.log('slider Entry');
    this.cardSliderComponent.pagePosition = `translate3d(${
      this.cardSliderComponent.translateLength + this.width
    }%, 0px, 0px)`;
  }

  override setNextMovies(nextMovies: MovieInfo[], incrementor: number): void {
    this.cardSliderComponent.sliderMovieInfo = [
      ...this.cardSliderComponent.sliderMovieInfo.slice(
        0,
        2 * this.cardSliderComponent.cardsPerPage + 1
      ),
      ...nextMovies,
      ...this.cardSliderComponent.sliderMovieInfo.slice(
        2 * this.cardSliderComponent.cardsPerPage + 1,
        this.cardSliderComponent.sliderMovieInfo.length
      ),
    ];
  }

  override resetContentPosition(incrementor: number): void {
    this.cardSliderComponent.sliderMovieInfo = [
      this.cardSliderComponent.sliderMovieInfo[
        this.cardSliderComponent.sliderMovieInfo.length - 1
      ],
      ...this.cardSliderComponent.sliderMovieInfo,
      this.cardSliderComponent.sliderMovieInfo[0],
    ];
    
    this.cardSliderComponent.sliderController = new SliderNext(
      this.cardSliderComponent
    ).getNewInstance();

    this.cardSliderComponent.pagePosition = `translate3d(${this.cardSliderComponent.translateLength}%, 0px, 0px)`;
    this.cardSliderComponent.isSlidingItems = false;
  }

  override scaleOrigin(i: number): string {
    switch (i) {
      case 0:
        return '0% 50%';

      case this.cardSliderComponent.cardsPerPage -1:
        return '100% 50%';

      default:
        return '50% 50%';
    }
  }
}

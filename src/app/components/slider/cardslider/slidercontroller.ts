import { MovieInfo } from 'src/app/models/movie';
import { CardsliderComponent } from './cardslider.component';

export abstract class SliderController {
  constructor(public cardSliderComponent: CardsliderComponent) {}

  public abstract getNewInstance(): SliderController;

  translatePage(incrementor: number): void {}
  setNextMovies(nextMovies: MovieInfo[], incrementor: number): void {}
  resetContentPosition(incrementor: number): void {}
  handleUpdateRenderImage(num: number) {}
  updateRenderImageRight() {}
  updateRenderImageLeft() {}
  scaleOrigin(i: number): string {
    return '';
  }
}

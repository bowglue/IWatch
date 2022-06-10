import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MovieInfo } from 'src/app/models/movie';

@Injectable({
  providedIn: 'root',
})
export class MockCardInfoService {
  constructor() {}
  isCardMute: boolean = true;

  movieInfo(): Observable<MovieInfo[]> {
    const list: MovieInfo[] = [
      {
        movie_id: 1,
        movie_name: 'Doctor Strange',
        movie_image: '../../../assets/movie-image/Carousel_item1.webp',
        //movie_trailer: '../../../assets/movie-trailer/trailer1.mp4',
        movie_title: '../../../assets/movie-image/movie-title-image/title1.png',
        movie_focus: '../../../assets/movie-image/movie-focus-image/focus1.jpg',
      },
      {
        movie_id: 2,
        movie_name: 'Avangers: Endgame',
        movie_image: '../../../assets/movie-image/Carousel_item2.webp',
        //movie_trailer: '../../../assets/movie-trailer/trailer2.mp4',
        movie_title: '../../../assets/movie-image/movie-title-image/title2.png',
        movie_focus: '../../../assets/movie-image/movie-focus-image/focus2.jpg',
      },
      {
        movie_id: 3,
        movie_name: 'Avangers: Infinity War',
        movie_image: '../../../assets/movie-image/Carousel_item3.webp',
        //movie_trailer: '../../../assets/movie-trailer/trailer3.mp4',
        movie_title: '../../../assets/movie-image/movie-title-image/title3.png',
        movie_focus: '../../../assets/movie-image/movie-focus-image/focus3.jpg',
      },
      {
        movie_id: 4,
        movie_name: 'Venom',
        movie_image: '../../../assets/movie-image/Carousel_item4.webp',
        //movie_trailer: '../../../assets/movie-trailer/trailer4.mp4',
        movie_title: '../../../assets/movie-image/movie-title-image/title4.png',
        movie_focus: '../../../assets/movie-image/movie-focus-image/focus4.jpg',
      },
      {
        movie_id: 5,
        movie_name: 'Transformers',
        movie_image: '../../../assets/movie-image/Carousel_item5.webp',
        //movie_trailer: '../../../assets/movie-trailer/trailer5.mp4',
        movie_title: '../../../assets/movie-image/movie-title-image/title5.png',
        movie_focus: '../../../assets/movie-image/movie-focus-image/focus5.jpg',
      },
      {
        movie_id: 6,
        movie_name: 'Warcraft',
        movie_image: '../../../assets/movie-image/Carousel_item6.webp',
        //movie_trailer: '../../../assets/movie-trailer/trailer6.mp4',
        movie_title: '../../../assets/movie-image/movie-title-image/title6.png',
        movie_focus: '../../../assets/movie-image/movie-focus-image/focus6.jpg',
      },
      {
        movie_id: 7,
        movie_name: 'Kong',
        movie_image: '../../../assets/movie-image/Carousel_item7.webp',
        //movie_trailer: '../../../assets/movie-trailer/trailer7.mp4',
        movie_title: '../../../assets/movie-image/movie-title-image/title7.png',
        movie_focus: '../../../assets/movie-image/movie-focus-image/focus7.jpg',
      },
      {
        movie_id: 8,
        movie_name: 'Divergence',
        movie_image: '../../../assets/movie-image/Carousel_item8.webp',
        //movie_trailer: '../../../assets/movie-trailer/trailer8.mp4',
        movie_title: '../../../assets/movie-image/movie-title-image/title8.png',
        movie_focus: '../../../assets/movie-image/movie-focus-image/focus8.jpg',
      },
      {
        movie_id: 9,
        movie_name: 'Captain America',
        movie_image: '../../../assets/movie-image/Carousel_item9.webp',
       // movie_trailer: '../../../assets/movie-trailer/trailer9.mp4',
        movie_title: '../../../assets/movie-image/movie-title-image/title9.png',
        movie_focus: '../../../assets/movie-image/movie-focus-image/focus9.jpg',
      },
      {
        movie_id: 10,
        movie_name: 'Avangers',
        movie_image: '../../../assets/movie-image/Carousel_item10.webp',
        //movie_trailer: '../../../assets/movie-trailer/trailer10.mp4',
        movie_title:
          '../../../assets/movie-image/movie-title-image/title10.png',
        movie_focus:
          '../../../assets/movie-image/movie-focus-image/focus10.jpg',
      },
      {
        movie_id: 11,
        movie_name: "Assassin's Creed",
        movie_image: '../../../assets/movie-image/Carousel_item11.webp',
        //movie_trailer: '../../../assets/movie-trailer/trailer11.mp4',
        movie_title:
          '../../../assets/movie-image/movie-title-image/title11.png',
        movie_focus:
          '../../../assets/movie-image/movie-focus-image/focus11.jpg',
      },
      {
        movie_id: 12,
        movie_name: 'Avangers: Age Of Ultron',
        movie_image: '../../../assets/movie-image/Carousel_item12.webp',
        //movie_trailer: '../../../assets/movie-trailer/trailer12.mp4',
        movie_title:
          '../../../assets/movie-image/movie-title-image/title12.png',
        movie_focus:
          '../../../assets/movie-image/movie-focus-image/focus12.jpg',
      },
      {
        movie_id: 13,
        movie_name: 'Iron Man 3',
        movie_image: '../../../assets/movie-image/Carousel_item13.webp',
        //movie_trailer: '../../../assets/movie-trailer/trailer13.mp4',
        movie_title:
          '../../../assets/movie-image/movie-title-image/title13.png',
        movie_focus:
          '../../../assets/movie-image/movie-focus-image/focus13.jpg',
      },
      {
        movie_id: 14,
        movie_name: 'kung Fu Panda 3',
        movie_image: '../../../assets/movie-image/Carousel_item14.webp',
       // movie_trailer: '../../../assets/movie-trailer/trailer14.mp4',
        movie_title:
          '../../../assets/movie-image/movie-title-image/title14.png',
        movie_focus:
          '../../../assets/movie-image/movie-focus-image/focus14.jpg',
      },
      {
        movie_id: 15,
        movie_name: 'Dracula Untold',
        movie_image: '../../../assets/movie-image/Carousel_item15.webp',
       // movie_trailer: '../../../assets/movie-trailer/trailer15.mp4',
        movie_title:
          '../../../assets/movie-image/movie-title-image/title15.png',
        movie_focus:
          '../../../assets/movie-image/movie-focus-image/focus15.jpg',
      },
      {
        movie_id: 16,
        movie_name: 'Avatar',
        movie_image: '../../../assets/movie-image/Carousel_item16.webp',
        //movie_trailer: '../../../assets/movie-trailer/trailer16.mp4',
        movie_title:
          '../../../assets/movie-image/movie-title-image/title16.png',
        movie_focus:
          '../../../assets/movie-image/movie-focus-image/focus16.jpg',
      },
      {
        movie_id: 17,
        movie_name: 'Godzilla Vs Kong',
        movie_image: '../../../assets/movie-image/Carousel_item17.webp',
       // movie_trailer: '../../../assets/movie-trailer/trailer17.mp4',
        movie_title:
          '../../../assets/movie-image/movie-title-image/title17.png',
        movie_focus:
          '../../../assets/movie-image/movie-focus-image/focus17.jpg',
      },
      {
        movie_id: 18,
        movie_name: 'Jurassic World',
        movie_image: '../../../assets/movie-image/Carousel_item18.webp',
       // movie_trailer: '../../../assets/movie-trailer/trailer18.mp4',
        movie_title:
          '../../../assets/movie-image/movie-title-image/title18.png',
        movie_focus:
          '../../../assets/movie-image/movie-focus-image/focus18.jpg',
      },
    ];

    return of(list);
  }
}

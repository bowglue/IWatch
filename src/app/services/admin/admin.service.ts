import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieInfo } from 'src/app/models/movie';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private httpClient: HttpClient) {}

  upload(dataMovie: MovieInfo) {
    return this.httpClient.post('/server/api/v1/movie/upload', dataMovie);
  }
}

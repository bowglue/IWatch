import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { first } from 'rxjs';
import { AdminService } from 'src/app/services/admin/admin.service';
import { CardInfoService } from 'src/app/services/card-info/card-info.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private cardInfoService: CardInfoService
  ) {}

  @ViewChild('videoPlayer') videoplayer!: ElementRef;
  movieForm!: FormGroup;
  imgCompressed!: string;
  videoCompressed!: any;
  arrayOfBlob: Uint8Array[] = [];
  i: number = -1;
  mediaSource!: MediaSource;
  sourceBuffer!: SourceBuffer;
  interval: any;
  imageSize!: number;
  movieTitle!: string;
  movieFocus!: string;

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.movieForm = this.formBuilder.group({
      movie_name: new FormControl('', [Validators.required]),
      movie_image: new FormControl('', [Validators.required]),
      movie_title: new FormControl('', [Validators.required]),
      movie_focus: new FormControl('', [Validators.required]),
    });
  }

  get movie_name() {
    return this.movieForm.get('movie_name');
  }
  get movie_image() {
    return this.movieForm.get('movie_image');
  }

  get movie_video() {
    return this.videoCompressed;
  }

  streamVideo() {
    const videoElement = document.querySelector('video');
    this.mediaSource = new MediaSource();
    var url = URL.createObjectURL(this.mediaSource);

    if (videoElement) videoElement.src = url;

    this.mediaSource.addEventListener('sourceopen', () => {
      this.sourceBuffer = this.mediaSource.addSourceBuffer(
        `video/webm; codecs="vp9,opus"`
      );

      this.interval = setInterval(() => {
        console.log('enter');
        this.addStreamVideo();
      }, 1000);
    });
  }

  async chunkVideo(arrayBuffer: ArrayBuffer, file: File) {
    const size = 100000;
    var id = 1;
    const buf = new Uint8Array(arrayBuffer);
    for (let i = 0; i < arrayBuffer.byteLength; i += size) {
      this.arrayOfBlob.push(buf.slice(i, i + size));
      var fd = new FormData();
      fd.append('movie_id', JSON.stringify(25));
      fd.append('segment_id', JSON.stringify(id++));
      fd.append('data', file.slice(i, i + size));
      await fetch('/server/api/v1/trailer', { method: 'post', body: fd }).then(
        (res) => res.text()
      );
    }
  }

  createVideoChunk(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (ev) => {
        this.chunkVideo(reader.result as ArrayBuffer, file);
      };
    }
  }

  addStreamVideo() {
    this.i = this.i + 1;
    if (this.arrayOfBlob[this.i])
      return this.sourceBuffer.appendBuffer(this.arrayOfBlob[this.i]);
    clearInterval(this.interval);
    this.mediaSource.endOfStream();
  }

  getTrailerChunk() {
    this.cardInfoService
      .getMovieTrailer(1, 1)
      .pipe(first())
      .subscribe((res) => {
        console.log(res);
      });
  }

  compressFile(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_ev) => {
        // let transform: string =
        //   reader.result != undefined ? reader.result?.toString() : '';
        // file.type === 'image/webp';
        this.imgCompressed = reader.result as string;
        // let resize = this.compressImage(transform, this.imageSize).then(
        //   (data) => {
        //     this.imgCompressed = data;
        //   }
        // );
      };
    }
  }

  compressImage(src: string, size: number): Promise<string> {
    return new Promise((res, rej) => {
      const img = this.createImage(src);
      img.onload = () => {
        let ratio = img.height / img.width;
        const elem = document.createElement('canvas');
        elem.width = img.width * size;
        elem.height = img.height * size;
        const ctx = elem.getContext('2d');
        ctx?.drawImage(img, 0, 0, elem.width, elem.height);
        const dataURI = ctx?.canvas.toDataURL('image/webp');
        const data = dataURI != undefined ? dataURI : '';
        res(data);
      };
      img.onerror = (error) => rej(error);
    });
  }

  private createImage(source: string) {
    let imageContent = source;
    const img = new Image();
    img.src = imageContent;
    return img;
  }

  readFileTitle(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_ev) => {
        console.log(reader.result);
        this.movieTitle = reader.result as string;
      };
    }
  }

  readFileFocus(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_ev) => {
        console.log(reader.result);
        this.movieFocus = reader.result as string;
        
      };
    }
  }

  setImageSize(event: any) {
    this.imageSize = event.target.value;
  }

  onSubmit(): void {
    this.movieForm.controls['movie_image'].setValue(this.imgCompressed);
    this.movieForm.controls['movie_title'].setValue(this.movieTitle);
    this.movieForm.controls['movie_focus'].setValue(this.movieFocus);
    console.log(this.movieForm.get('movie_title')?.value);

    this.adminService
      .upload(this.movieForm.value)
      .pipe(first())
      .subscribe({
        next: (_data) => {
          console.log('image upload');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}

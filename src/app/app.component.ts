import { Component, ElementRef, ViewChild } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('uploadEl') uploadElRef: ElementRef;
  @ViewChild('sound') sound: ElementRef;
  public isError = false;
  public showBalls = false;
  public options: CloudOptions = {
    width: 1,
    height: 400,
    overflow: false,
  };
  public uploader: FileUploader;
  public hasBaseDropZoneOver: boolean = false;

  public data: Array<CloudData> = [
    { text: 'rock', weight: 10 },
    { text: 'Indie Pop', weight: 6 },
    { text: 'Indie', weight: 9 },
    { text: 'Jazz', weight: 8 },
    { text: 'Reggae', weight: 7 },
    { text: 'Soundtrack', weight: 1 },
    { text: 'Sound', weight: 2 },
    { text: 'Soundt', weight: 3 },
    { text: 'Soundtra', weight: 4 },
    { text: 'Soundtra', weight: 4 },
    { text: 'Sodtra', weight: 4 },
    { text: 'Soundtra', weight: 5 },
    { text: 'Soundtra', weight: 15 },
    { text: 'Soura', weight: 12 },
    { text: 'Soundtra', weight: 8 },
    { text: 'Stra', weight: 6 },
    { text: 'Soundtra', weight: 4 },
    { text: 'Soundtra', weight: 4 },
    { text: 'Soundtra', weight: 4 },
    { text: 'Soundtrack', weight: 1 }
  ];

  constructor() {
    this.uploader= new FileUploader({ 
      url: '/api/files',
      removeAfterUpload: true
    });    
    this.uploader.onAfterAddingFile = (fileItem: any) => {
      this.uploadElRef.nativeElement.value = '';
      if (this.uploader.queue.length > 1) {
        this.uploader.removeFromQueue(this.uploader.queue[0]);
      }
      this.sound.nativeElement.src = URL.createObjectURL(fileItem.some);
      this.sound.nativeElement.onend = function(e) {
        URL.revokeObjectURL(this.src);
      }
      fileItem.upload();
      this.data = [];
      this.showBalls = true;
      this.isError = false;
      fileItem.onSuccess = (response: any, status: number, headers: any) => {
        this.showPreloader(() => {
          this.data = JSON.parse(response);
          this.isError = false;
        });
      }
      fileItem.onError = (response: any, status: number, headers: any) => {
        this.showPreloader(() => {
          this.data = [];
          this.isError = true;
        });
      }
    }
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  logClicked(clicked: CloudData) {
    console.log(clicked);
  }

  public showPreloader(callback) {
    setTimeout(() => {
      this.showBalls = false;
      callback();
    }, 1000);
  }
}

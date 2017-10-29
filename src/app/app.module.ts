import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    FileSelectDirective,
    FileDropDirective
  ],
  imports: [
    BrowserModule,
    TagCloudModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

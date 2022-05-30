import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AngularAWSPrivateImageManagerModule } from 's3-private-image-mng';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularAWSPrivateImageManagerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

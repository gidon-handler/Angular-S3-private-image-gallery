import { NgModule } from '@angular/core';
import { TriggerDirective } from './trigger.directive';
import { ImageManagerComponent } from './image-manager/image-manager.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    TriggerDirective,
    ImageManagerComponent
  ],
  imports: [CommonModule, HttpClientModule],
  exports: [TriggerDirective]
})
export class AngularAWSPrivateImageManagerModule { }

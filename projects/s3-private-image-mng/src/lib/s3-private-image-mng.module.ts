import { NgModule } from '@angular/core';
import { TriggerDirective } from './trigger.directive';
import { ImageManagerComponent } from './image-manager/image-manager.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    TriggerDirective,
    ImageManagerComponent
  ],
  imports: [CommonModule],
  exports: [TriggerDirective]
})
export class AngularAWSPrivateImageManagerModule { }

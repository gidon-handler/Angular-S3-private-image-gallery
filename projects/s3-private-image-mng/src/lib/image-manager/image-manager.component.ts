import { Component, ElementRef, ViewChild} from '@angular/core';
import { TriggerDirective } from '../trigger.directive';

@Component({
  selector: 's3imgs-image-manager',
  templateUrl: './image-manager.component.html',
  styleUrls: ['./image-manager.component.scss'],
  
  
})
export class ImageManagerComponent  {

  upload: boolean = false;
  objURL: string = '';
  @ViewChild('thumb') thumbnail: ElementRef<HTMLLabelElement> | any;

  constructor( public trigger: TriggerDirective) {}

  onSelectFiles(e: Event) {
     const file = (e.target as HTMLInputElement).files![0];
     this.objURL = URL.createObjectURL(file);
     const img = new Image(150);
     img.src = this.objURL;
     this.thumbnail.nativeElement.after(img);
     
  }


}

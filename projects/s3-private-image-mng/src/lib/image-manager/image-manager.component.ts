import { Component, ElementRef, ViewChild} from '@angular/core';
import { TriggerDirective } from '../trigger.directive';

@Component({
  selector: 's3imgs-image-manager',
  templateUrl: './image-manager.component.html',
  styleUrls: ['./image-manager.component.scss']
})
export class ImageManagerComponent  {

  temp = [
    {
      id: 1,
      img: "https://media.exapro.com/product/2020/08/P00820091/c9546fbff07a5670ccd0a15071ea8eb3/462x340/hewlett-packard-hp-indigo-7500-digital-press-p00820091_7.jpg"
  },
    {
      id: 2,
      img: "https://media.exapro.com/product/2020/08/P00820091/c9546fbff07a5670ccd0a15071ea8eb3/462x340/hewlett-packard-hp-indigo-7500-digital-press-p00820091_7.jpg"
  },
    {
      id: 3,
      img: "https://media.exapro.com/product/2020/08/P00820091/c9546fbff07a5670ccd0a15071ea8eb3/462x340/hewlett-packard-hp-indigo-7500-digital-press-p00820091_7.jpg"
  },
    {
      id: 4,
      img: "https://media.exapro.com/product/2020/08/P00820091/c9546fbff07a5670ccd0a15071ea8eb3/462x340/hewlett-packard-hp-indigo-7500-digital-press-p00820091_7.jpg"
  },
    {
      id: 5,
      img: "https://media.exapro.com/product/2020/08/P00820091/c9546fbff07a5670ccd0a15071ea8eb3/462x340/hewlett-packard-hp-indigo-7500-digital-press-p00820091_7.jpg"
  },
    {
      id: 6,
      img: "https://media.exapro.com/product/2020/08/P00820091/c9546fbff07a5670ccd0a15071ea8eb3/462x340/hewlett-packard-hp-indigo-7500-digital-press-p00820091_7.jpg"
  },
]

  selected: any;
  upload: boolean = false;
  @ViewChild('thumb') thumbnail: ElementRef<HTMLLabelElement> | any;

  constructor( public trigger: TriggerDirective) {}

  onSelectFiles(e: Event) {
     const file = (e.target as HTMLInputElement).files![0];
     const img = new Image(150);
     img.src = URL.createObjectURL(file);
     this.thumbnail.nativeElement.after(img);
  }

  onSelectItem(){
     this.trigger.s3imgSelected.emit(this.selected)
  }
}

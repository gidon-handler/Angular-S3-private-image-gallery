import { Component} from '@angular/core';
import { TriggerDirective } from '../trigger.directive';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 's3imgs-image-manager',
  templateUrl: './image-manager.component.html',
  styleUrls: ['./image-manager.component.scss']
})
export class ImageManagerComponent {


  selected: any;
  upload: boolean = false;
  images$ = this.http.get<any>(this.trigger.apiPath);

  constructor(public trigger: TriggerDirective, private http: HttpClient) { }

  onSelectFiles(e: any, thumb: HTMLImageElement) {
    thumb.src = URL.createObjectURL(e.target.files[0])
  }

  onSelectItem() {
    this.trigger.s3imgSelected.emit(this.selected)
  }

  onUpload(tag: string, file: any ){
     const fd = new FormData;
     fd.append('tag', tag);
     fd.append('file', file.files[0])
     this.http.post(this.trigger.apiPath, fd).subscribe()
  }
}

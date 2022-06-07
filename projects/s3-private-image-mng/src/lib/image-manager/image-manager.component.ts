import { ChangeDetectorRef, Component } from '@angular/core';
import { TriggerDirective } from '../trigger.directive';
import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 's3imgs-image-manager',
  templateUrl: './image-manager.component.html',
  styleUrls: ['./image-manager.component.scss']
})
export class ImageManagerComponent {


  selected: any;
  upload: boolean = false;
  images$ = this.http.get<any>(this.trigger.apiPaths.getImages);

  constructor(public trigger: TriggerDirective, private http: HttpClient, private cd: ChangeDetectorRef) { }

  onSelectFiles(e: any, thumb: HTMLImageElement) {
    thumb.src = URL.createObjectURL(e.target.files[0])
  }

  onSelectItem() {
    this.trigger.s3imgSelected.emit(this.selected);
    this.trigger.vc.clear();
  }

  onUpload(tag: string, file: any) {
    const fd = new FormData;
    fd.append('tag', tag);
    fd.append('file', file.files[0])
    this.http.post(this.trigger.apiPaths.upload, fd).subscribe({
     
      next: () => {
        this.upload = false;
        this.cd.markForCheck();
      }
    })
  }

  deleteImage(id: string) {
    this.http.delete(this.trigger.apiPaths.delete + '/' + id).subscribe({
      next: () => alert("Image deleted")
    })
  }
}

import { ChangeDetectorRef, Component } from '@angular/core';
import { TriggerDirective } from '../trigger.directive';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';


@Component({
  selector: 's3imgs-image-manager',
  templateUrl: './image-manager.component.html',
  styleUrls: ['./image-manager.component.scss']
})
export class ImageManagerComponent {

  selected: any;
  upload: boolean = false;
  images$ = this.http.get<any>(this.trigger.apiPaths.getImages);
  progress = 0;

  constructor(public trigger: TriggerDirective, private http: HttpClient, private cd: ChangeDetectorRef) { }

  getImages(tag: string = '') {
    this.images$ = this.http.get<any>(this.trigger.apiPaths.getImages + tag);
  }

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
    this.http.post(this.trigger.apiPaths.upload, fd, { withCredentials: true, reportProgress: true, observe: 'events' }).subscribe({

      next: (e: HttpEvent<any>) => {
        
        switch (e.type) {

          case HttpEventType.UploadProgress:
            this.progress = e.total ? e.loaded / e.total * 100 : 0
            break
          case HttpEventType.Response:
            this.progress = 0;
            this.upload = false;
            this.getImages();
        }
        this.cd.markForCheck();
      }
    })
  }

  deleteImage(id: string) {
    this.http.delete(this.trigger.apiPaths.delete + '/' + id).subscribe({
      next: () => alert("Image deleted")
    })
  }

  full() {
    window.open(this.selected.url, '', 'popup')
  }
}

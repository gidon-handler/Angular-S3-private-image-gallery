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
  images$ = this.http.get<any>(this.trigger.apiPaths.getImages, { withCredentials: true });
  progress = 0;
  errorMsg = '';
  constructor(public trigger: TriggerDirective, private http: HttpClient, private cd: ChangeDetectorRef) { }

  getImages(tag: string = '') {
    this.images$ = this.http.get<any>(this.trigger.apiPaths.getImages + tag);
  }

  onSelectFiles(e: any, thumb: HTMLImageElement, tag: HTMLInputElement) {

    if (!tag.value) {
      tag.value = e.target.files?.item(0)?.name.replace(/\..+$/, '');
      this.cd.markForCheck();
    }

    thumb.src = URL.createObjectURL(e.target.files[0])
  }

  onSelectItem() {
    this.trigger.s3imgSelected.emit(this.selected);
    this.trigger.vc.clear();
  }

  onUpload(tag: string, file: HTMLInputElement) {

    const fd = new FormData;
    fd.append('tag', tag);
    fd.append('file', file.files ? file.files[0] : '');
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
      },
      error: e => {
        this.errorMsg = e.error
      }
    }
    )
  }


  deleteImage(selected: any) {
    if(selected.ActionIds.length > 0) {
      alert("This image is linked to other content entities.");
      return;
    }
    this.http.delete(this.trigger.apiPaths.delete + '/' + selected.id).subscribe({
      next: () => {
        alert("Image deleted");
        this.close();
      },
    })
  }


  full() {
    window.open(this.selected.url, '', 'popup')
  }

  close() {
    this.selected = null;
    this.trigger.vc.clear();
  }
}

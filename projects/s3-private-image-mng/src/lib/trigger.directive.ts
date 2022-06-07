import { Directive, EventEmitter, HostListener, Injector, Input, Output, ViewContainerRef, ViewRef } from '@angular/core';
import { ImageManagerComponent } from './image-manager/image-manager.component';

export interface ApiPaths {
  getImages: string,
  upload: string,
  delete: string
}

@Directive({
  selector: '[s3imgsTrigger]'
})
export class TriggerDirective {

  @Input('s3imgsTrigger') apiPaths: ApiPaths = { getImages: '/', upload: '/upload', delete: '/delete' };
  @Output() s3imgSelected = new EventEmitter<number>();

  @HostListener('click')
  openModal() {
    this.vc.createComponent(ImageManagerComponent, { injector: this.injector });
  }

  constructor(public vc: ViewContainerRef, private injector: Injector) { }

}




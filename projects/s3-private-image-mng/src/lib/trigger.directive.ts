import { ComponentRef, Directive, EventEmitter, HostListener, Injector, Input, Output, ViewContainerRef, ViewRef } from '@angular/core';
import { ImageManagerComponent } from './image-manager/image-manager.component';

export interface ApiPaths{
  getImages: string,
  upload: string,
  delete: string
}

@Directive({
  selector: '[s3imgsTrigger]'
})
export class TriggerDirective {

  viewRef: ViewRef | undefined;
  @Input('s3imgsTrigger') apiPaths: ApiPaths = {getImages: '/', upload: '/upload', delete: '/delete'}; 
  @Output() s3imgSelected = new EventEmitter<number>();

  @HostListener('click')
  openModal() {

    if (this.viewRef) {
      this.vc.insert(this.viewRef)
    }
    else {
      let comp: ComponentRef<ImageManagerComponent> = this.vc.createComponent(ImageManagerComponent, { injector: this.injector });
      this.viewRef = comp.hostView;
    }
  }

  constructor(public vc: ViewContainerRef, private injector: Injector) { }
  
}




import { ComponentRef, Directive, EventEmitter, HostListener, Injector, Output, ViewContainerRef, ViewRef } from '@angular/core';
import { ImageManagerComponent } from './image-manager/image-manager.component';

@Directive({
  selector: '[s3imgsTrigger]'
})
export class TriggerDirective {

  viewRef: ViewRef | undefined;

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




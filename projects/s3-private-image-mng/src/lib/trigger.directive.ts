import { ComponentRef, Directive, HostListener, InjectionToken, Injector, ViewContainerRef, ViewRef } from '@angular/core';

import { ImageManagerComponent } from './image-manager/image-manager.component';

@Directive({
  selector: '[s3imgsTrigger]',

})
export class TriggerDirective {

  viewRef: ViewRef | undefined;

  @HostListener('click') openModal() {

    if (this.viewRef) {
     this.vc.insert(this.viewRef)
    }
    else {
      let comp: ComponentRef<ImageManagerComponent> = this.vc.createComponent(ImageManagerComponent, { injector: this.injector });
      this.viewRef = comp.hostView;
    }
  }

  constructor(public vc: ViewContainerRef, private injector: Injector) { }

  ngOnDestroy(): void {
   console.log(1111)
   this.vc.clear()
    
  }
}




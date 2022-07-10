import { Component } from '@angular/core';
import { ApiPaths } from 's3-private-image-mng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'image-lib-holder';
  apis: ApiPaths = {
    getImages: '/v2/api/sp/ppc/gallery/',
    upload: '/v2/api/sp/ppc/gallery/upload',
    delete: '/v2/api/sp/ppc/gallery'
  }
}

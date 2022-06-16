# Angular AWS S3 Private Image Manager


## An Angular image gallary to manage, add, delete, and select images that are stored in a private S3 bucket.

In todays environments static resources such as images are mostly stored off your app server such as AWS S3 buckets.
Store the pathes to those assets in your DB or such and access to those files is seamless.
However, in many cases or requirements those bucket must be private, which make access to those files from the browser more complex.

This is an Angular library which implements the client side feature to view, add, select, and delete images from a private S3 bucket.
We will document the needed sevre side and DB api's needed to support this feature. 

## Client Side

**Install the library.**

```
npm install  ngx-awsS3-private-image-mng --save
```

**Usage**
In your ngModule

```
import { AngularAWSPrivateImageManagerModule } from 'ngx-awsS3-private-image-mng';
...
@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    AngularAWSPrivateImageManagerModule
  ]
})

```

In your Component .ts file

```
import { ApiPaths, GalleryImage } from 'ngx-awsS3-private-image-mng';

@Component({
...
})
export class MyComponent implements OnInit {

  apis: ApiPaths = {
    getImages: '/path/to/getImages/api/',
    upload: '/path/to/upload/api',
    delete: '/path/to/delete/api/'
  }
```

In your Compoent .html file

```
 <any-el [s3imgsTrigger]="apis"(s3imgSelected)="myFunc($event)"></any-el>
```

The $event emited will be an object with the shape of GalleryImage. ({id: string, url: string, thumbnailUrl: string})







## Server Side

Since the bucket is private your server will have to generate AWS presigned urls to view the images.

**Database**

TDB

**Server**

TBD



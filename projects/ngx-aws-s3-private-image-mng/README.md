# Angular AWS S3 Private Image Manager


## An Angular image gallary to manage, add, delete, and select images that are stored in a private S3 bucket.

In todays environments static resources such as images are mostly stored off your app server such as AWS S3 buckets.
Store the pathes to those assets in your DB or such, and access to those files is seamless.
However, in many cases or requirements those bucket must be private, which make access to those files from the browser more complex.

This is an Angular library which implements the client side feature to view, add, select, and delete images from a private S3 bucket.
We will document the needed sevre side and DB api's needed to support this feature.

Besides beeing an Angular library, this library has no dependencies (only HttpClientModule). So can be used in any Angular project.

## Client Side

**Install the library.**

```
npm install  ngx-aws-s3-private-image-mng --save
```

**Usage**
In your ngModule

```
import { AngularAWSPrivateImageManagerModule } from 'ngx-aws-s3-private-image-mng';
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
import { ApiPaths, GalleryImage } from 'ngx-aws-s3-private-image-mng';

@Component({
...
})
export class MyComponent implements OnInit {
  
  // Serve API that get Imported into the library
  apis: ApiPaths = {
    getImages: '/path/to/getImages/api/',
    upload: '/path/to/upload/api',
    delete: '/path/to/delete/api'
  }
```

In your Compoent .html file

```
 <any-el [s3imgsTrigger]="apis"(s3imgSelected)="myFunc($event)"></any-el>
```
The s3imageSelected event is triggered when an image is selcted from the gallery.
The $event emited by this event will be an object with the shape of GalleryImage. ({id: string, url: string, thumbnailUrl: string}).



## Server Side

Since the bucket is private your server will have to generate AWS presigned urls to view the images.
Your server will need to save the original file and a thumbnail version of the file. (when viewing the list of images only the thumbnail will be downloaded) 


**Database**

### A table or collection with the following fields:
* id 
* key
* size
* tag
* thumbnail
* thumbnailUrl
* url

```
TBD
```

**Server**

### The server will need the following API's
* GET. Takes an optional tag param. Returns an array of image objects. The object will contain AWS presigned URL'S.
* POST. Takes an image file and a tag name. Creates a thumbnail version, saves to DB and to S3 bucket.
* DELETE. API with id route param of the image id to delete. Deletes form DB and from S3 bucket.

```
TBD
```



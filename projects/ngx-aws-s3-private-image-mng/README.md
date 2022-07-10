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
  
  // Server APIs that get Imported into the library
  apis: ApiPaths = {
    getImages: '/path/to/getImages/api/',
    upload: '/path/to/upload/api',
    delete: '/path/to/delete/api'
  }
```

In your Compoent .html file

```
 <any-el [s3imgsTrigger]="apis" [disableDelete]="true" (s3imgSelected)="myFunc($event)"></any-el>
```
@Input() disableDelete - whether the delete image option is disabled. (defualt is falue).
The s3imageSelected event is triggered when an image is selcted from the gallery.
The $event emited by this event will be an object with the shape of GalleryImage. ({id: string, url: string, thumbnailUrl: string}).



## Server Side

Since the bucket is private your server will have to generate AWS presigned urls to view the images.
Your server will need to save the original file and a thumbnail version of the file. (when viewing the list of images only the thumbnail will be downloaded) 


**Database**

### A table or collection with the following fields:
* id 
* key: String - The S3 path and name of the image. (someFolder/someFloder/nameOfFile)
* size: Int - The size of the original image.
* tag: String - Tag name of the image for searching. (this comes from client when uploading a new file)


**Server**

### Your server will need the following API's
* POST. Takes an image file and a tag name (The payload will be a formData object with fields **tag** and **file**). Create a thumbnail version and save original and thumbnail images to S3 bucket (apent the string "thumbnail" to the thumbnail version). Save to DB size, tag and key (The key is the S3 path and name of the image. (someFolder/someFloder/nameOfFile).

* GET. Takes an optional (url) tag param. Return an array of image objects. The serve will get the rows from the DB (Filter the results by the optional tag field.),  generate AWS presigned URL'S for each image and thumbnail and return to client along with tag, size, and key for each image.
Each object will have the shape of
```{id: "theDBid", key: "the KeyFieldFromDB",size: "theSizeFieldFromDB", tag: "theTagFieldFromDB", thumbnail: "thePathOfFileThumnail", thumbnailUrl: "theGeneratedPresigendURLofThumnail", url: "theGeneratedPresigendURLofOriginal" }```.


* DELETE. API with id route param of the image id to delete. Delete form DB and from S3 bucket (Don't forget to delete original and thumbnail).




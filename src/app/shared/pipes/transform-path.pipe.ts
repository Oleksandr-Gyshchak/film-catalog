import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformImgPath'
})

export class TransformImgPathPipe implements PipeTransform {

  transform(path: string, size: number): string {
    return (!path)
      ? 'https://d36vjxsq82j5c3.cloudfront.net/media/catalog/category/resized/200_200_no_image.gif'
      : `https://image.tmdb.org/t/p/w${size}${path}`;
  }
}

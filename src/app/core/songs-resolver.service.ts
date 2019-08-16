import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Song, SongsService } from './songs.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class SongResolver implements Resolve<Song> {
  constructor(private service: SongsService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Song> {
    const slug = route.paramMap.get('slug');
    const id = this.service.getIdFromSlug(slug);
    return this.service.songData(id);
      // .pipe(
      //   tap(song => this.service.switch(song))
      // );
  }
}

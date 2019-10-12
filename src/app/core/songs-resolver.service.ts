import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { SongsService } from './songs.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Song } from '../models/song.model';

@Injectable()
export class SongResolver implements Resolve<Song> {
  constructor(private service: SongsService) { }

  resolve(route: ActivatedRouteSnapshot): Song {
    const slug = route.paramMap.get('slug');
    return this.service.minimalSongData(slug);
  }
}

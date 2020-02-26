
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, map, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Song, WordpressPage } from '../models/song.model';



@Injectable({
  providedIn: 'root'
})
export class SongsService {
  readonly songs$: Observable<Song[]>;
  private readonly songs = new BehaviorSubject<Song[]>(undefined);

  constructor(private http: HttpClient) {
    this.songs$ = this.songs.asObservable();
  }

  songList(): Observable<Song[]> {
    this.songs.next([
      {
        wpId: 1678,
        slug: 'berg',
        title: 'Berg',
        trackNumber: 3,
        rotation: 6,
        x: 1103,
        y: 42
      },
      {
        wpId: 1607,
        slug: 'blauwdruk',
        title: 'Blauwdruk',
        trackNumber: 1,
        rotation: 318,
        x: 2119,
        y: 390
      },
      {
        wpId: 1609,
        slug: 'morse',
        title: 'Morse',
        trackNumber: 2,
        rotation: 299,
        x: 2597,
        y: 727
      },
      {
        wpId: 1680,
        slug: 'zomer',
        title: 'Zomer',
        trackNumber: 4,
        rotation: 278,
        x: 2459,
        y: 1114
      },
      {
        wpId: 1703,
        slug: 'groen',
        title: 'Groen',
        trackNumber: 6,
        rotation: 248,
        x: 2365,
        y: 1776
      },
      {
        wpId: 1705,
        slug: 'dijk',
        title: 'Dijk',
        trackNumber: 5,
        rotation: 226,
        x: 2216,
        y: 2311
      },
      {
        wpId: 1679,
        slug: 'haven',
        title: 'Haven',
        trackNumber: 7,
        rotation: 194,
        x: 1496,
        y: 2484
      },
      {
        wpId: 1707,
        slug: 'gaan',
        title: 'Gaan',
        trackNumber: 8,
        rotation: 151,
        x: 694,
        y: 2277
      },
      {
        wpId: 1677,
        slug: 'wolven',
        title: 'Wolven',
        trackNumber: 9,
        rotation: 116,
        x: 202,
        y: 1584
      },
      {
        wpId: 1709,
        slug: 'kooi',
        title: 'Kooi',
        trackNumber: 10,
        rotation: 94,
        x: 209,
        y: 1415
      },
      {
        wpId: 1711,
        slug: 'nacht',
        title: 'Nacht',
        trackNumber: 11,
        rotation: 66,
        x: 236,
        y: 919
      },
      {
        wpId: 1713,
        slug: 'vogels',
        title: 'Vogels',
        trackNumber: 12,
        rotation: 49,
        x: 360,
        y: 439
      },
    ]);

    return this.songs$;
  }

  getIdFromSlug(slug: string): number {
    return this.songs.value.find(song => song.slug === slug).wpId;
  }

  cacheSong(slug, songData): Song {
    const updated = this.songs.value.map(s => s.slug === slug ? { ...s, ...songData } : s);
    this.songs.next(updated);
    return updated.find(s => s.slug === slug);
  }

  minimalSongData(slug: string): Song {
    return this.songs.value.find(s => s.slug === slug);
  }

  songData(slug: string): Observable<Song> {
    const song: Song = this.songs.value.find(s => s.slug === slug);

    if (song.text) {
      return of(song);
    }

    const currentIndex = this.songs.value.indexOf(song);
    let links = {};
    if (currentIndex === 0) {
      links = {
        next: this.songs.value[currentIndex + 1].slug,
        prev: this.songs.value[this.songs.value.length - 1].slug
      };
    } else if (currentIndex === this.songs.value.length - 1) {
      links = {
        next: this.songs.value[0].slug,
        prev: this.songs.value[currentIndex - 1].slug
      };
    } else {
      links = {
        next: this.songs.value[currentIndex + 1].slug,
        prev: this.songs.value[currentIndex - 1].slug
      };
    }

    return this.http.get<WordpressPage>(`https://bertramvanalphen.nl/wp-json/wp/v2/pages/${this.getIdFromSlug(slug)}`).pipe(
      shareReplay(),
      map(page => {
        return this.cacheSong(slug, {
          wpId: page.id,
          text: page.content.rendered,
          videoId: page.meta.video,
          spotify: page.meta.spotify,
          credits: page.meta.credits,
          links
        });
      })
    );
  }
}

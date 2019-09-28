
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
        wpId: 1607,
        slug: 'blauwdruk',
        title: 'Blauwdruk',
        trackNumber: 1,
        rotation: 30,
        x: 2589,
        y: 617
      },
      {
        wpId: 1609,
        slug: 'morse',
        title: 'Morse',
        trackNumber: 2,
        rotation: 60,
        x: 2597,
        y: 727
      },
      {
        wpId: 1607,
        slug: 'schommel',
        title: 'Schommel',
        trackNumber: 3,
        rotation: 90,
        x: 2459,
        y: 1114
      },
      {
        wpId: 1607,
        slug: 'groen',
        title: 'Groen',
        trackNumber: 4,
        rotation: 120
      },
      {
        wpId: 1607,
        slug: 'dijk',
        title: 'Dijk',
        trackNumber: 5,
        rotation: 150
      },
      {
        wpId: 1607,
        slug: 'haven',
        title: 'Haven',
        trackNumber: 6,
        rotation: 180
      },
      {
        wpId: 1607,
        slug: 'gaan',
        title: 'Gaan',
        trackNumber: 7,
        rotation: 210
      },
      {
        wpId: 1607,
        slug: 'wolven',
        title: 'Wolven',
        trackNumber: 8,
        rotation: 240
      },
      {
        wpId: 1607,
        slug: 'holst',
        title: 'Holst',
        trackNumber: 9,
        rotation: 270
      },
      {
        wpId: 1607,
        slug: 'nacht',
        title: 'Nacht',
        trackNumber: 10,
        rotation: 300
      },
      {
        wpId: 1607,
        slug: 'afgrond',
        title: 'Afgrond',
        trackNumber: 11,
        rotation: 330
      },
      {
        wpId: 1607,
        slug: 'vogels',
        title: 'Vogels',
        trackNumber: 12,
        rotation: 340
      },
      {
        wpId: 1607,
        slug: 'berg',
        title: 'Berg',
        trackNumber: 13,
        rotation: 350,
        x: 1103,
        y: 42
      },
      {
        wpId: 1607,
        slug: 'zomer',
        title: 'Zomer',
        trackNumber: 14,
        rotation: 360,
        x: 2119,
        y: 390
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
          links
        });
      })
    );
  }
}

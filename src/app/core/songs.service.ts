import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, map, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Song {
  wpId: number;
  slug: string;
  title: string;
  trackNumber: number;
  text?: string;
  videoId?: string;
  detail?: any;
  spotify?: string;
}

export interface WordpressPage {
  id: number;
  date: string;
  date_gmt: string;
  guid: RenderedContent;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: RenderedContent;
  content: RenderedContent;
  excerpt: RenderedContent;
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta?: PageMatadata;
  _links: any;
}

export interface PageMatadata {
  video?: string;
  spotify?: string;
}

export interface RenderedContent {
  rendered: string;
  protected?: boolean;
}

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
        trackNumber: 1
      },
      {
        wpId: 1609,
        slug: 'morse',
        title: 'Morse',
        trackNumber: 2
      },
      {
        wpId: 1607,
        slug: 'schommel',
        title: 'Schommel',
        trackNumber: 3
      },
      {
        wpId: 1607,
        slug: 'groen',
        title: 'Groen',
        trackNumber: 4
      },
      {
        wpId: 1607,
        slug: 'dijk',
        title: 'Dijk',
        trackNumber: 5
      },
      {
        wpId: 1607,
        slug: 'haven',
        title: 'Haven',
        trackNumber: 6
      },
      {
        wpId: 1607,
        slug: 'gaan',
        title: 'Gaan',
        trackNumber: 7
      },
      {
        wpId: 1607,
        slug: 'wolven',
        title: 'Wolven',
        trackNumber: 8
      },
      {
        wpId: 1607,
        slug: 'holst',
        title: 'Holst',
        trackNumber: 9
      },
      {
        wpId: 1607,
        slug: 'nacht',
        title: 'Nacht',
        trackNumber: 10
      },
      {
        wpId: 1607,
        slug: 'afgrond',
        title: 'Afgrond',
        trackNumber: 11
      },
      {
        wpId: 1607,
        slug: 'vogels',
        title: 'Vogels',
        trackNumber: 12
      },
      {
        wpId: 1607,
        slug: 'berg',
        title: 'Berg',
        trackNumber: 13
      },
      {
        wpId: 1607,
        slug: 'zomer',
        title: 'Zomer',
        trackNumber: 14
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

    return this.http.get<WordpressPage>(`https://bertramvanalphen.nl/wp-json/wp/v2/pages/${this.getIdFromSlug(slug)}`).pipe(
      shareReplay(),
      map(page => {
        return this.cacheSong(slug, {
          wpId: page.id,
          text: page.content.rendered,
          videoId: page.meta.video,
          spotify: page.meta.spotify
        });
      })
    );
  }
}

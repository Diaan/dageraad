import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, map, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Song {
  wpId: number;
  slug: string;
  title: string;
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
        wpId: 4,
        slug: 'song1',
        title: 'Song 1'
      },
      {
        wpId: 2,
        slug: 'song2',
        title: 'Song 2'
      },
      {
        wpId: 19,
        slug: 'song3',
        title: 'Song 3'
      },
      {
        wpId: 22,
        slug: 'song4',
        title: 'Song 4'
      },
      {
        wpId: 25,
        slug: 'song5',
        title: 'Song 5'
      },
    ]);

    return this.songs$;
  }

  getIdFromSlug(slug: string): number {
    return this.songs.value.find(song => song.slug === slug).wpId;
  }

  cacheSong(songData): Song {
    const updated = this.songs.value.map(s => s.wpId === songData.wpId ? {...s, ...songData} :  s);
    this.songs.next(updated);
    return updated.find(s => s.wpId === songData.wpId);
  }

  songData(wpId: number): Observable <Song> {
    const song: Song = this.songs.value.find(s => s.wpId === wpId);

    if (song.text) {
      return of(song);
    }

    return this.http.get<WordpressPage>(`http://dageraad.dianabroeders.nl/wp-json/wp/v2/pages/${wpId}`).pipe(
      shareReplay(),
      map(page => {
        return this.cacheSong({
          wpId: page.id,
          text: page.content.rendered,
          videoId: page.meta.video,
          spotify: page.meta.spotify
        });
      })
    );
  }
}

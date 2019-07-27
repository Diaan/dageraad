import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface Song {
  wpId: number;
  slug: string;
  title: string;
  text?: string;
  videoLink?: string;
  detail?: any;
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
  meta?: (null)[] | null;
  _links: any;
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
        wpId: 1481,
        slug: 'song1',
        title: 'Song 1'
      },
      {
        wpId: 1479,
        slug: 'song2',
        title: 'Song 2'
      },
      {
        wpId: 1172,
        slug: 'song3',
        title: 'Song 3'
      },
      {
        wpId: 1143,
        slug: 'song4',
        title: 'Song 4'
      },
      {
        wpId: 1052,
        slug: 'song5',
        title: 'Song 5'
      },
    ]);

    return this.songs$;
  }

  songData(wpId: number): Observable <Song> {
    const song: Song = this.songs.value.find(s => s.wpId === wpId);

    if (song.text) {
      return of(song);
    }

    return this.http.get<WordpressPage>(`http://bertramvanalphen.nl/wp-json/wp/v2/pages/${wpId}`).pipe(
      map(page => {
        const songs = this.songs.value.map(song => {
          if (song.wpId === page.id) {
            // song.text = page.content.rendered;
            song.text = page.excerpt.rendered;
          }
          return song;
        });

        this.songs.next(songs);
        return this.songs.value.find(s => s.wpId === wpId);
      })
    );
  }
}

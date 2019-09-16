import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, map, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Song {
  wpId: number;
  slug: string;
  title: string;
  trackNumber: number;
  imageUrl: string;
  x: number;
  y: number;
  rotation: number;
  text?: string;
  videoId?: string;
  detail?: any;
  spotify?: string;
  links?: {
    next: string;
    prev: string;
  };
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
      {// 0
        wpId: 1607,
        slug: 'blauwdruk',
        title: 'Blauwdruk',
        trackNumber: 1,
        imageUrl: '/assets/images/track1.png',
        x: 0,
        y: 0,
        rotation: 0.78
      },
      {// 1
        wpId: 1609,
        slug: 'morse',
        title: 'Morse',
        trackNumber: 2,
        imageUrl: '/assets/images/track2.png',
        x: 100,
        y: 0,
        rotation: 0.02
      },
      {// 2
        wpId: 1607,
        slug: 'schommel',
        title: 'Schommel',
        trackNumber: 3,
        imageUrl: '/assets/images/track3.png',
        x: 200,
        y: 0,
        rotation: 5.46
      },
      {// 3
        wpId: 1607,
        slug: 'groen',
        title: 'Groen',
        trackNumber: 4,
        imageUrl: '/assets/images/track4.png',
        x: 200,
        y: 100,
        rotation: 4.74
      },
      {// 4
        wpId: 1607,
        slug: 'dijk',
        title: 'Dijk',
        trackNumber: 5,
        imageUrl: '/assets/images/track5.png',
        x: 200,
        y: 200,
        rotation: 3.9
      },
      {// 5
        wpId: 1607,
        slug: 'haven',
        title: 'Haven',
        trackNumber: 6,
        imageUrl: '/assets/images/track6.png',
        x: 100,
        y: 200,
        rotation: 3.1
      },
      {// 6
        wpId: 1607,
        slug: 'gaan',
        title: 'Gaan',
        trackNumber: 7,
        imageUrl: '/assets/images/track7.png',
        x: 0,
        y: 200,
        rotation: 2.3
      },
      {// 7
        wpId: 1607,
        slug: 'wolven',
        title: 'Wolven',
        trackNumber: 8,
        imageUrl: '/assets/images/track8.png',
        x: 0,
        y: 100,
        rotation: 1.6
      },
      // {
      //   wpId: 1607,
      //   slug: 'holst',
      //   title: 'Holst',
      //   trackNumber: 9,
      //   path: 'M517.408,1293.13L636.08,1090.48C587.494,1065.55 538.911,1013.53 513.437,968.646L311.565,1084.48C311.565,1084.48 389.035,1229 517.408,1293.13Z',
      //   rotation: 270
      // },
      // {
      //   wpId: 1607,
      //   slug: 'nacht',
      //   title: 'Nacht',
      //   trackNumber: 10,
      //   path: 'M308.349,1078.74L511.978,961.753C482.182,915.989 465.836,846.716 466.01,795.104L233.267,795.423C233.267,795.423 228.76,959.333 308.349,1078.74Z',
      //   rotation: 300
      // },
      // {
      //   wpId: 1607,
      //   slug: 'afgrond',
      //   title: 'Afgrond',
      //   trackNumber: 11,
      //   path: 'M225.749,790.144L460.542,795.054C458.644,740.477 480.401,672.708 507.192,628.594L307.687,508.73C307.687,508.73 219.22,646.79 225.749,790.144Z',
      //   rotation: 330
      // },
      // {
      //   wpId: 1607,
      //   slug: 'vogels',
      //   title: 'Vogels',
      //   trackNumber: 12,
      //   path: 'M311.13,503.126L512.501,623.962C537.951,575.645 590.484,527.622 635.642,502.63L521.977,299.53C521.977,299.53 376.638,375.447 311.13,503.126Z',
      //   rotation: 340
      // },
      // {
      //   wpId: 1607,
      //   slug: 'berg',
      //   title: 'Berg',
      //   trackNumber: 13,
      //   path: 'M311.13,503.126L512.501,623.962C537.951,575.645 590.484,527.622 635.642,502.63L521.977,299.53C521.977,299.53 376.638,375.447 311.13,503.126Z',
      //   rotation: 350
      // },
      // {
      //   wpId: 1607,
      //   slug: 'zomer',
      //   title: 'Zomer',
      //   trackNumber: 14,
      //   path: 'M311.13,503.126L512.501,623.962C537.951,575.645 590.484,527.622 635.642,502.63L521.977,299.53C521.977,299.53 376.638,375.447 311.13,503.126Z',
      //   rotation: 360
      // },
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

    const currentIndex = this.songs.value.indexOf(song) ;
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

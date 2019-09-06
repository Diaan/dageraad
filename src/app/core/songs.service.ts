import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, map, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Song {
  wpId: number;
  slug: string;
  title: string;
  trackNumber: number;
  path: string;
  rotation: number;
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
        trackNumber: 1,
        path: 'M515.726,299.211L632.08,503.205C677.937,473.551 747.261,457.421 798.872,457.757L799.28,225.014C799.28,225.014 635.384,219.996 515.726,299.211Z',
        rotation: 30
      },
      {
        wpId: 1609,
        slug: 'morse',
        title: 'Morse',
        trackNumber: 2,
        path: 'M805.857,225.091L805.573,459.934C860.102,456.962 928.286,477.38 972.919,503.296L1088.83,301.469C1088.83,301.469 949.054,215.739 805.857,225.091Z',
        rotation: 60
      },
      {
        wpId: 1607,
        slug: 'schommel',
        title: 'Schommel',
        trackNumber: 3,
        path: 'M1097.16,297.59L975.693,498.583C1023.93,524.184 1071.79,576.867 1096.64,622.102L1300.09,509.072C1300.09,509.072 1224.63,363.496 1097.16,297.59Z',
        rotation: 90
      },
      {
        wpId: 1607,
        slug: 'groen',
        title: 'Groen',
        trackNumber: 4,
        path: 'M1303.23,514.852L1098,629.015C1127.16,675.187 1142.55,744.68 1141.66,796.284L1374.39,799.184C1374.39,799.184 1381.16,635.352 1303.23,514.852Z',
        rotation: 120
      },
      {
        wpId: 1607,
        slug: 'dijk',
        title: 'Dijk',
        trackNumber: 5,
        path: 'M1378.45,794.694L1143.61,793.53C1146.38,848.07 1125.71,916.177 1099.62,960.713L1301.02,1077.38C1301.02,1077.38 1387.27,937.926 1378.45,794.694Z',
        rotation: 150
      },
      {
        wpId: 1607,
        slug: 'haven',
        title: 'Haven',
        trackNumber: 6,
        path: 'M1297.66,1083.04L1094.39,965.429C1069.71,1014.15 1017.95,1063 973.198,1088.71L1090.09,1289.97C1090.09,1289.97 1234.2,1211.75 1297.66,1083.04Z',
        rotation: 180
      },
      {
        wpId: 1607,
        slug: 'gaan',
        title: 'Gaan',
        trackNumber: 7,
        path: 'M1089.29,1299.12L975.895,1093.47C929.614,1122.45 860.064,1137.58 808.463,1136.5L804.691,1369.21C804.691,1369.21 968.497,1376.6 1089.29,1299.12Z',
        rotation: 210
      },
      {
        wpId: 1607,
        slug: 'wolven',
        title: 'Wolven',
        trackNumber: 8,
        path: 'M798.116,1369.04L801.795,1134.23C747.228,1136.41 679.347,1115.01 635.093,1088.45L516.276,1288.58C516.276,1288.58 654.798,1376.32 798.116,1369.04Z',
        rotation: 240
      },
      {
        wpId: 1607,
        slug: 'holst',
        title: 'Holst',
        trackNumber: 9,
        path: 'M517.408,1293.13L636.08,1090.48C587.494,1065.55 538.911,1013.53 513.437,968.646L311.565,1084.48C311.565,1084.48 389.035,1229 517.408,1293.13Z',
        rotation: 270
      },
      {
        wpId: 1607,
        slug: 'nacht',
        title: 'Nacht',
        trackNumber: 10,
        path: 'M308.349,1078.74L511.978,961.753C482.182,915.989 465.836,846.716 466.01,795.104L233.267,795.423C233.267,795.423 228.76,959.333 308.349,1078.74Z',
        rotation: 300
      },
      {
        wpId: 1607,
        slug: 'afgrond',
        title: 'Afgrond',
        trackNumber: 11,
        path: 'M225.749,790.144L460.542,795.054C458.644,740.477 480.401,672.708 507.192,628.594L307.687,508.73C307.687,508.73 219.22,646.79 225.749,790.144Z',
        rotation: 330
      },
      {
        wpId: 1607,
        slug: 'vogels',
        title: 'Vogels',
        trackNumber: 12,
        path: 'M311.13,503.126L512.501,623.962C537.951,575.645 590.484,527.622 635.642,502.63L521.977,299.53C521.977,299.53 376.638,375.447 311.13,503.126Z',
        rotation: 340
      },
      {
        wpId: 1607,
        slug: 'berg',
        title: 'Berg',
        trackNumber: 13,
        path: 'M311.13,503.126L512.501,623.962C537.951,575.645 590.484,527.622 635.642,502.63L521.977,299.53C521.977,299.53 376.638,375.447 311.13,503.126Z',
        rotation: 350
      },
      {
        wpId: 1607,
        slug: 'zomer',
        title: 'Zomer',
        trackNumber: 14,
        path: 'M311.13,503.126L512.501,623.962C537.951,575.645 590.484,527.622 635.642,502.63L521.977,299.53C521.977,299.53 376.638,375.447 311.13,503.126Z',
        rotation: 360
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

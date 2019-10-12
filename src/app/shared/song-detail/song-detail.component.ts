import { SongsService } from 'src/app/core/songs.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Song } from 'src/app/models/song.model';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss'],
})
export class SongDetailComponent implements OnInit {
  song: Observable<Song>;

  @Output() nextEvent = new EventEmitter<any>();
  @Output() prevEvent = new EventEmitter<any>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private songsService: SongsService
  ) { }

  ngOnInit() {
    this.song = this.activatedRoute.params.pipe(
      switchMap(paramData => this.songsService.songData(paramData.slug)),
      shareReplay()
    );
  }

  navigateTo(slug: string) {
    this.router.navigate(['/song', slug]);
  }
}

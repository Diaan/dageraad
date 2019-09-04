import { Component, OnInit, HostBinding } from '@angular/core';
import { SongsService, Song } from 'src/app/core/songs.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss']
})
export class WheelComponent implements OnInit {
  songs$: Observable<Song[]>;
  activeSong$: Observable<Song>;
  paused = false;

  @HostBinding('class.paused') get isPaused() {
    return this.paused;
  }

  constructor(
    private songsService: SongsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.songs$ = this.songsService.songList();
  }

  navigateTo(song: Song) {
    this.router.navigate(['/song', song.slug]);
  }

  pause() {
    this.paused = true;
  }

  play() {
    this.paused = false;
  }
}

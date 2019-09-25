import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { SongsService } from 'src/app/core/songs.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Song } from 'src/app/models/song.model';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss']
})
export class WheelComponent implements OnInit {
  songs$: Observable<Song[]>;
  paused = false;

  @Input() activeSong: { song: Song };
  @HostBinding('class.paused') get isPaused() {
    return this.paused;
  }
  @HostBinding('style') get myStyle(): SafeStyle {
    if (this.activeSong && this.activeSong.song) {
      return this.sanitizer.bypassSecurityTrustStyle(
        `--rotation-deg: ${this.activeSong.song.rotation}deg;`
      );
    } else {
      return;
    }
  }

  constructor(
    private songsService: SongsService,
    private router: Router,
    private sanitizer: DomSanitizer
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

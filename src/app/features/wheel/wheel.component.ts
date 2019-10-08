import { Component, OnInit, HostBinding, Input, ElementRef } from '@angular/core';
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
        `--rotation: ${this.activeSong.song.rotation}deg;`
      );
    } else {
      return;
    }
  }

  constructor(
    private songsService: SongsService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private element: ElementRef
  ) { }

  ngOnInit() {
    this.songs$ = this.songsService.songList();
  }

  navigateTo(song: Song) {
    this.router.navigate(['/song', song.slug]);
  }

  pause() {
    console.log('pause');
    this.paused = true;
  }

  play() {
    this.paused = false;
  }

  private setCssVar(key, value) {
    this.element.nativeElement.style.setProperty(key, value);
  }
}

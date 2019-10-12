import { Component, OnInit, HostBinding, Input, ElementRef, OnChanges } from '@angular/core';
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
export class WheelComponent implements OnInit, OnChanges {
  songs$: Observable<Song[]>;
  paused = false;

  @Input() activeSong: { song: Song };
  @HostBinding('class.paused') get isPaused() {
    return this.paused;
  }

  constructor(
    private songsService: SongsService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private element: ElementRef<HTMLElement>
  ) { }

  ngOnInit() {
    this.songs$ = this.songsService.songList();
    this.setCssVar('--rotation', '0deg');
  }

  ngOnChanges() {
    console.log('onchanges');
    if (this.activeSong && this.activeSong.song) {
      this.setCssVar('--rotation', this.activeSong.song.rotation + 'deg');
    }
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

  private setCssVar(key, value) {
    console.log('set', key, 'to', value);
    this.element.nativeElement.style.setProperty(key, value);
  }
}

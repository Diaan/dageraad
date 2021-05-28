import { InstructionService } from './../../core/instruction.service';
import { Component, OnInit, HostBinding, Input, ElementRef, OnChanges, ViewChild } from '@angular/core';
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
  currentRotation: number;
  rotating: boolean;
  animate: boolean;

  @Input() activeSong: { song: Song };
  @HostBinding('class.paused') get isPaused() {
    return this.paused;
  }
  @HostBinding('class.active') get isActive() {
    return !!this.activeSong.song;
  }

  @ViewChild('wheelGroup', { static: true })
  wheelGroup: ElementRef<HTMLElement>;

  constructor(
    private songsService: SongsService,
    private router: Router,
    private instructionService: InstructionService,
    private element: ElementRef<HTMLElement>
  ) { }

  ngOnInit() {
    this.songs$ = this.songsService.songList();
    this.setCssVar('--rotation', '0deg');
    this.rotating = true;
  }

  ngOnChanges() {
    if (this.activeSong && this.activeSong.song) {
      this.setRotation(this.activeSong.song.rotation);
    } else {
      this.animate = false;
      this.rotating = true;
    }
  }

  navigateTo(song: Song) {
    this.instructionService.songClicked();
    this.router.navigate(['/song', song.slug]);
  }

  pause() {
    this.paused = true;
  }

  play() {
    this.paused = false;
  }

  private setRotation(rotation) {
    // freeze current rotation; read from keyframe, set css property:
    const currentTransform = this.getRotationDegrees(window.getComputedStyle(this.wheelGroup.nativeElement).transform);
    this.setCssVar('--rotation', currentTransform + 'deg');
    this.rotating = false;

    this.currentRotation = currentTransform;
    if (Math.abs(rotation - this.currentRotation) > 180) {
      this.animate = false;
      if (this.currentRotation > rotation) {
        this.setCssVar('--rotation', (this.currentRotation - 360) + 'deg');
      } else {
        this.setCssVar('--rotation', (this.currentRotation + 360) + 'deg');
      }
    }
    setTimeout(() => {
      this.animate = true;
      this.setCssVar('--rotation', rotation + 'deg');
    }, 100);
  }

  private setCssVar(key, value) {
    this.element.nativeElement.style.setProperty(key, value);
  }

  private getRotationDegrees(matrix) {
    if (!matrix) {
      return 0;
    }
    const values = matrix.split('(')[1].split(')')[0].split(',');
    const a = values[0];
    const b = values[1];
    let angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    if (angle < 0) {
      angle += 360;
    }
    return angle;
  }
}

import { Component, OnInit, HostBinding, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { SongsService, Song } from 'src/app/core/songs.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { take } from 'rxjs/operators';
import * as PIXI from 'pixi.js';

const ROTATION_SPEED = 0.003;
const NAVIGATE_SPEED = 0.05;

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss']
})
export class WheelComponent implements OnInit, OnChanges {
  songs$: Observable<Song[]>;
  paused = false;

  app: PIXI.Application;
  renderer: PIXI.Renderer;
  container: PIXI.Container;
  wheel: PIXI.Container;
  rotateTo: number;
  rotateBackwards: boolean;
  zoomTo: number;
  zoomIn: boolean;

  get rotationspeed() {
    if (this.rotateTo) {
      return NAVIGATE_SPEED;
    }
    if (this.paused || (this.activeSong.song && !this.rotateTo)) {
      return 0;
    }
    return ROTATION_SPEED;
  }

  get zoomspeed() {
    if ((this.zoomIn && this.wheel.scale.x > this.zoomTo) || (!this.zoomIn && this.wheel.scale.x < this.zoomTo)) {
      return 0;
    }
    return ROTATION_SPEED;
  }

  @Input() activeSong: {song: Song};

  constructor(
    private songsService: SongsService,
    private router: Router,
    private element: ElementRef
  ) { }

  ngOnInit() {
    this.songsService.songList().pipe(
      take(1)
    ).subscribe(songs => this.createWheel(songs));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.activeSong && (
        (changes.activeSong.currentValue && changes.activeSong.currentValue.song) ||
        (changes.activeSong.previousValue && changes.activeSong.previousValue.song)
      )) {
      if (changes.activeSong.currentValue.song) {
        this.wheel.rotation = this.wheel.rotation % (2 * Math.PI);
        this.rotateBackwards = changes.activeSong.currentValue.song.rotation < this.wheel.rotation;

        if (Math.abs(this.wheel.rotation - changes.activeSong.currentValue.song.rotation) > Math.PI) {
          if (this.wheel.rotation - changes.activeSong.currentValue.song.rotation > 0) {
            this.wheel.rotation = this.wheel.rotation - 2 * Math.PI;
          } else {
            this.wheel.rotation = this.wheel.rotation + 2 * Math.PI;
          }
          this.rotateBackwards = !this.rotateBackwards;
        }
        this.rotateTo =  changes.activeSong.currentValue.song.rotation;
      } else if (changes.activeSong && changes.activeSong.previousValue && changes.activeSong.previousValue.song) {
        // terug naar standaard rotatie
        this.paused = false;
        this.rotateTo = null;
        this.rotateBackwards = false;
      }


      console.log(changes);
      if (changes.activeSong.previousValue.song && !changes.activeSong.currentValue.song) {
        this.zoomIn = false;
      } else {
        this.zoomIn = true;
      }

      if (this.activeSong && this.activeSong.song) {
        this.zoomTo = 2;
      } else {
        this.zoomTo = 1;
      }
    }

  }

  createWheel(songs: Song[]) {
    this.renderer = PIXI.autoDetectRenderer({
      width: 800,
      height: 800,
      transparent: true,
      resolution: window.devicePixelRatio || 1,
    });

    this.element.nativeElement.appendChild(this.renderer.view);

    this.container = new PIXI.Container();
    this.wheel = new PIXI.Container();

    for (const song of songs) {
      this.wheel.addChild(this.createElement(song));
    }
    this.container.addChild(this.wheel);

    // Move container to the center
    this.wheel.x = this.renderer.screen.width / 2;
    this.wheel.y = this.renderer.screen.height / 2;

    // Center bunny sprite in local container coordinates
    this.wheel.pivot.x = this.container.width / 2;
    this.wheel.pivot.y = this.container.height / 2;

    this.animate();
  }

   animate() {
    requestAnimationFrame(() => this.animate());

    // check if rotated far enough
    if (this.rotateBackwards) {
      if (this.rotateTo && this.wheel.rotation < this.rotateTo) {
        this.paused = true;
        this.rotateTo = null;
      }
    } else {
      if (this.rotateTo && this.wheel.rotation > this.rotateTo) {
        this.paused = true;
        this.rotateTo = null;
      }
    }

    // rotate
    if (this.rotateBackwards) {
      this.wheel.rotation -= this.rotationspeed;
    } else {
      this.wheel.rotation += this.rotationspeed;
    }

    // zoom
    if (this.zoomIn && this.wheel.scale.x < this.zoomTo) {
      this.wheel.scale.x += NAVIGATE_SPEED;
      this.wheel.scale.y += NAVIGATE_SPEED;
    } else if (!this.zoomIn && this.wheel.scale.x > this.zoomTo) {
      this.wheel.scale.x -= NAVIGATE_SPEED;
      this.wheel.scale.y -= NAVIGATE_SPEED;
    }

    this.renderer.render(this.container);
  }

  createElement(data: Song) {
    const basetexture = new PIXI.BaseTexture(data.imageUrl);
    const texture = new PIXI.Texture(basetexture);
    const element = new PIXI.Sprite(texture);

    element.anchor.set(0.5);
    element.x = data.x;
    element.y = data.y;

    element.interactive = true;
    element.buttonMode = true;
    element.on('pointerover', () => this.pause());
    element.on('pointerout', () => this.play());
    element.on('pointerdown', () => this.navigateTo(data));

    return element;
  }

  pause() {
    this.paused = true;
  }

  play() {
    this.paused = false;
    }

  navigateTo(song: Song) {
    this.router.navigate(['/song', song.slug]);
  }
}

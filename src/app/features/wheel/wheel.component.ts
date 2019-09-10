import { Component, OnInit, HostBinding, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { SongsService, Song } from 'src/app/core/songs.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { take } from 'rxjs/operators';
import * as PIXI from 'pixi.js';

const ROTATION_SPEED = 0.003;
const NAVIGATE_SPEED = 0.03;

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss']
})
export class WheelComponent implements OnInit, OnChanges {
  songs$: Observable<Song[]>;
  paused = false;

  app: PIXI.Application;
  renderer: any; // PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  container: PIXI.Container;
  wheel: PIXI.Container;
  rotateTo: number;
  rotateBackwards: boolean;

  // rotationspeed: number = ROTATION_SPEED;
  get rotationspeed() {
    if (this.rotateTo) {
      return NAVIGATE_SPEED;
    }
    if (this.paused || (this.activeSong.song && !this.rotateTo)) {
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
    if (changes.activeSong && changes.activeSong.currentValue.song) {
      this.wheel.rotation = this.wheel.rotation % (2 * Math.PI);
      this.rotateBackwards = changes.activeSong.currentValue.song.rotation < this.wheel.rotation;
      this.rotateTo =  changes.activeSong.currentValue.song.rotation;
    } else if (changes.activeSong && changes.activeSong.previousValue && changes.activeSong.previousValue.song) {
      this.paused = false;
      this.rotateTo = null;
      this.rotateBackwards = false;
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

    if (this.rotateBackwards) {
      this.wheel.rotation -= this.rotationspeed;
    } else {
      this.wheel.rotation += this.rotationspeed;
    }
    this.renderer.render(this.container);
  }

  createElement(data) {
    const basetexture = new PIXI.BaseTexture(data.imageUrl);
    const texture = new PIXI.Texture(basetexture);
    const element = new PIXI.Sprite(texture);
    element.anchor.set(0.5);
    element.x = data.x;
    element.y = data.y;

    element.interactive = true;
    element.buttonMode = true;
    element.on('pointerover', () => this.pause(data.slug));
    element.on('pointerout', () => this.play());
    element.on('pointerdown', () => this.navigateTo(data));

    return element;
  }

  pause(s) {
    this.paused = true;
  }

  play() {
    this.paused = false;
    }

  navigateTo(song: Song) {

    this.router.navigate(['/song', song.slug]);
  }
}

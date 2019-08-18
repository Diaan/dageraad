import { animate, animation, keyframes, sequence, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Song } from 'src/app/core/songs.service';
import { ActivatedRoute, ParamMap, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export const bounceInUp = bounceInY('1000px', '-35px', '20px', '-10px');
@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss'],
  // animations: [
  //   transition(':enter', useAnimation(bounceInUp, {
  //     params: { timing: 1.5 }
  //   })
  //   ),
  //   transition(':leave', [
  //     style({ opacity: 1, transform: 'none', 'margin-top': '16px' }),
  //     sequence([
  //       animate('0.3s ease', style({ opacity: 0, transform: 'translate3d(0, 100%, 0)', 'margin-top': '-80px' }))
  //     ])
  //   ])
  // ]
})
export class SongDetailComponent implements OnInit {
  song: Observable<Song>;

  @Output() nextEvent = new EventEmitter<any>();
  @Output() prevEvent = new EventEmitter<any>();

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.song = this.activatedRoute.data.pipe(
      map(data => data.song),
      shareReplay()
    );
  }

  next() {
    this.nextEvent.emit();
  }

  prev() {
    this.prevEvent.emit();
  }

}

// TODO: move this to it's own file, so we can re-use it
export function bounceInY(a: string, b: string, c: string, d: string) {
  return animation(
    animate(
      '{{ timing }}s {{ delay }}s ease-in',
      keyframes([
        style({
          opacity: 0,
          transform: 'translate3d(0, {{ a }}, 0)',
          offset: 0
        }),
        style({
          opacity: 0.7,
          transform: 'translate3d(0, {{ b }}, 0)',
          offset: 0.6
        }),
        style({ transform: 'translate3d(0, {{ c }}, 0)', offset: 0.75 }),
        style({ transform: 'translate3d(0, {{ d }}, 0)', offset: 0.9 }),
        style({ opacity: 1, transform: 'none', offset: 1 })
      ])
    ),
    {
      params: {
        timing: 1000,
        delay: 0,
        a,
        b,
        c,
        d
      }
    }
  );
}

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, query, style, animate } from '@angular/animations';
import * as WebFont from 'webfontloader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* => *', [
        query(
          ':enter',
          [style({ transform: 'translateY(100%)' })],
          { optional: true }
        ),
        query(
          ':leave',
          [style({ transform: 'translateY(0)' }), animate('1s', style({ transform: 'translateY(100%)' }))],
          { optional: true }
        ),
        query(
          ':enter',
          [style({ transform: 'translateY(100%)' }), animate('1s', style({ transform: 'translateY(0)' }))],
          { optional: true }
        )
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  ngOnInit() {
    WebFont.load({
      custom: {
        families: ['Crimsons'],
        urls: ['/assets/fonts/fonts.css']
      }
    });
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}

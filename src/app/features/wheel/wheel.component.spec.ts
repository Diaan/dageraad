import { createTestComponentFactory, Spectator } from '@netbasal/spectator';
import { Router, convertToParamMap } from '@angular/router';
import { SongsService } from 'src/app/core/songs.service';
import { WheelComponent } from './wheel.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

describe('WheelComponent', () => {
  let spectator: Spectator<WheelComponent>;
  // let router: Router;

  const songsSubject = new BehaviorSubject(undefined);
  const songsService = {
    songs$: songsSubject.asObservable(),
    songList: jest.fn(() => songsSubject.asObservable())
  };

  const createComponent = createTestComponentFactory<WheelComponent>({
    component: WheelComponent,
    declarations: [
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [
      { provide: SongsService, useValue: songsService }
    ]
  });

  beforeEach(() => {

    // songsSubject.next([]);

    spectator = createComponent();
    // router = spectator.get(Router);
    // router.navigateByUrl = navigateByUrl;
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

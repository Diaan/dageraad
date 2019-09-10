import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Song } from 'src/app/core/songs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss'],
})
export class SongDetailComponent implements OnInit {
  song: Observable<Song>;

  @Output() nextEvent = new EventEmitter<any>();
  @Output() prevEvent = new EventEmitter<any>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.song = this.activatedRoute.data.pipe(
      map(data => data.song),
      shareReplay()
    );
  }

  navigateTo(slug: string) {
    console.log(slug);
    this.router.navigate(['/song', slug]);
  }
}

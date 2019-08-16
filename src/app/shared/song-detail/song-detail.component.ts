import { Component, OnInit, Input } from '@angular/core';
import { Song } from 'src/app/core/songs.service';
import { ActivatedRoute, ParamMap, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss']
})
export class SongDetailComponent implements OnInit {
  song: Observable<Song>;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.song = this.activatedRoute.data.pipe(
      map(data => data.song),
      shareReplay()
    );
  }

}

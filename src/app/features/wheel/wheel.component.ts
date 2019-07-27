import { Component, OnInit } from '@angular/core';
import { SongsService, Song } from 'src/app/core/songs.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss']
})
export class WheelComponent implements OnInit {
  songs$: Observable<Song[]>;
  activeSong$: Observable<Song>;

  constructor(private songsService: SongsService) { }

  ngOnInit() {
    this.songs$ = this.songsService.songList();
  }

  loadSong(song: Song) {
    this.activeSong$ = this.songsService.songData(song.wpId);
  }

}

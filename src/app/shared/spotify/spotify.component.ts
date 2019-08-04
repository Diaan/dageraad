import { Component, OnInit, Input } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.scss']
})
export class SpotifyComponent implements OnInit {

  @Input() spotifyUri: string;

  get embedUrl(): SafeUrl {
    const id = this.spotifyUri.split(':')[2];
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://open.spotify.com/embed/track/' + id);
  }

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}

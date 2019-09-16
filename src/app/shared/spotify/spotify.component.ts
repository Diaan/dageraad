import { Component, OnInit, Input } from '@angular/core';
import { SafeUrl, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.scss']
})
export class SpotifyComponent implements OnInit {
  embedUrl: SafeResourceUrl;

  @Input() spotifyUri: string;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const id = this.spotifyUri.split(':')[2];
    this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://open.spotify.com/embed/track/' + id);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeComponent implements OnInit {

  @Input() id: string;

  get embedUrl(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube-nocookie.com/embed/' + this.id);
  }

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}

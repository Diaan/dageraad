import { Component, OnInit, Input } from '@angular/core';
import { SafeUrl, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeComponent implements OnInit {
  embedUrl: SafeResourceUrl;

  @Input() id: string;

  // get embedUrl(): SafeUrl {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube-nocookie.com/embed/' + this.id);
  // }

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    console.log('init', this.id);
    this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube-nocookie.com/embed/' + this.id);
  }

}

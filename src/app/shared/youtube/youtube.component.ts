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

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube-nocookie.com/embed/' + this.id);
  }
}

import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SafeUrl, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeComponent implements OnChanges {
  embedUrl: SafeResourceUrl;

  @Input() id: string;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges() {
    this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube-nocookie.com/embed/${this.id}?modestbranding=1`);
  }
}

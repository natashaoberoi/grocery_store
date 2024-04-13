import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  safeSrc: SafeResourceUrl;


  ngOnInit() {
    //const tag = document.createElement('script');
    //tag.src = 'https://www.youtube.com/iframe_api';
    //document.body.appendChild(tag);
  }

  constructor(private sanitizer: DomSanitizer) {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/h443sq2jC8w");
  }

}

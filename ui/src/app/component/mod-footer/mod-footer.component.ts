
import { Component } from '@angular/core';
import { Inject, AfterViewInit, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-mod-footer',
  templateUrl: './mod-footer.component.html',
  styleUrls: ['./mod-footer.component.css']
})
export class ModFooterComponent implements AfterViewInit {

  constructor(
    @Inject(DOCUMENT) private document,
    private elementRef: ElementRef
  ) { }

  ngAfterViewInit() {
    const s = this.document.createElement('script');
    s.type = 'text/javascript';
    s.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9';
    this.elementRef.nativeElement.appendChild(s);
  }

}

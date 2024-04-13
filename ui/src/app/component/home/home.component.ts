
import { Component, Input, OnInit, Inject, AfterViewInit, ViewChild, ViewEncapsulation, ElementRef, Renderer2 } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';

import { CaseInsensitiveMap} from 'src/app/model/CaseInsensitiveMap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,
  AfterViewInit {
  statistics :any = {};
  immportdata:any;
  fqvalues: string[] = [];
  rows = '1000';
    
  // get the parameters for the search
  constructor(
    
    private route: ActivatedRoute, public router: Router,
    private renderer2: Renderer2, private el: ElementRef
    ) {
    
  }

  

  ngAfterViewInit() {
    let scriptEl = document.createElement('script');
    scriptEl.src = "https://platform.twitter.com/widgets.js"

    this.renderer2.appendChild(this.el.nativeElement, scriptEl);
  }


  ngOnInit() {
    console.log('In ngOnInit');
    this.statistics.studycount = 0;
    this.statistics.participants = 0;
    this.statistics.samplecount = 0;
    this.statistics.measurementcount = 0;
    let measurement = new CaseInsensitiveMap();
    
    
  }

}
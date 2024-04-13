import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HelpContactComponent } from './help-contact.component';

describe('HelpContactComponent', () => {
  let component: HelpContactComponent;
  let fixture: ComponentFixture<HelpContactComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

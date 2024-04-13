import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModHeaderComponent } from './mod-header.component';

describe('ModHeaderComponent', () => {
  let component: ModHeaderComponent;
  let fixture: ComponentFixture<ModHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

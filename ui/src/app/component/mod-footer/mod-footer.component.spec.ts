import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModFooterComponent } from './mod-footer.component';

describe('ModFooterComponent', () => {
  let component: ModFooterComponent;
  let fixture: ComponentFixture<ModFooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

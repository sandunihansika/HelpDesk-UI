import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonTextboxComponent } from './common-textbox.component';

describe('CommonTextboxComponent', () => {
  let component: CommonTextboxComponent;
  let fixture: ComponentFixture<CommonTextboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonTextboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

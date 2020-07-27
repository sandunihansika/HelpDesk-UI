import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonRadiobuttonComponent } from './common-radiobutton.component';

describe('CommonRadiobuttonComponent', () => {
  let component: CommonRadiobuttonComponent;
  let fixture: ComponentFixture<CommonRadiobuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonRadiobuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonRadiobuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

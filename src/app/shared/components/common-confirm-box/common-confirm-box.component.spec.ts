import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonConfirmBoxComponent } from './common-confirm-box.component';

describe('CommonConfirmBoxComponent', () => {
  let component: CommonConfirmBoxComponent;
  let fixture: ComponentFixture<CommonConfirmBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonConfirmBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonConfirmBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

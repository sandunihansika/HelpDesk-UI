import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuatationComponent } from './quatation.component';

describe('QuatationComponent', () => {
  let component: QuatationComponent;
  let fixture: ComponentFixture<QuatationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuatationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuatationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

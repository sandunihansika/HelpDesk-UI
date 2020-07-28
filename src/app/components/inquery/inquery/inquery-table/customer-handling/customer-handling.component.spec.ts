import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerHandlingComponent } from './customer-handling.component';

describe('CustomerHandlingComponent', () => {
  let component: CustomerHandlingComponent;
  let fixture: ComponentFixture<CustomerHandlingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerHandlingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

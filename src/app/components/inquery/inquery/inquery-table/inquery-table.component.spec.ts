import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InqueryTableComponent } from './inquery-table.component';

describe('InqueryTableComponent', () => {
  let component: InqueryTableComponent;
  let fixture: ComponentFixture<InqueryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InqueryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InqueryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighligtedItemComponent } from './highligted-item.component';

describe('HighligtedItemComponent', () => {
  let component: HighligtedItemComponent;
  let fixture: ComponentFixture<HighligtedItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighligtedItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighligtedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

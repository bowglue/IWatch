/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardFocusComponent } from './card-focus.component';

describe('CardFocusComponent', () => {
  let component: CardFocusComponent;
  let fixture: ComponentFixture<CardFocusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFocusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

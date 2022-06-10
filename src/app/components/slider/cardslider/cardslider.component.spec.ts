/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardsliderComponent } from './cardslider.component';

describe('CardsliderComponent', () => {
  let component: CardsliderComponent;
  let fixture: ComponentFixture<CardsliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

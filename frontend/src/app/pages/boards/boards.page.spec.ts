import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsPage } from './boards.page';

describe('BoardsPage', () => {
  let component: BoardsPage;
  let fixture: ComponentFixture<BoardsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

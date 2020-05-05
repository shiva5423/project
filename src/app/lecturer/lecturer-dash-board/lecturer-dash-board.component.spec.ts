import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerDashBoardComponent } from './lecturer-dash-board.component';

describe('LecturerDashBoardComponent', () => {
  let component: LecturerDashBoardComponent;
  let fixture: ComponentFixture<LecturerDashBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturerDashBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturerDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerDataComponent } from './lecturer-data.component';

describe('LecturerDataComponent', () => {
  let component: LecturerDataComponent;
  let fixture: ComponentFixture<LecturerDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturerDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsSingleComponent } from './comments-single.component';

describe('CommentsSingleComponent', () => {
  let component: CommentsSingleComponent;
  let fixture: ComponentFixture<CommentsSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

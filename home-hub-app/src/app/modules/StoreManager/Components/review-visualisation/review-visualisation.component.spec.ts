import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewVisualisationComponent } from './review-visualisation.component';

describe('ReviewVisualisationComponent', () => {
  let component: ReviewVisualisationComponent;
  let fixture: ComponentFixture<ReviewVisualisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewVisualisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewVisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

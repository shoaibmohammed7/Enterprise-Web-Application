import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesVisualisationComponent } from './sales-visualisation.component';

describe('SalesVisualisationComponent', () => {
  let component: SalesVisualisationComponent;
  let fixture: ComponentFixture<SalesVisualisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesVisualisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesVisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

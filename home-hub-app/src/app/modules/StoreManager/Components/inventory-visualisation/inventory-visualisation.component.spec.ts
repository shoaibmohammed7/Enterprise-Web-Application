import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryVisualisationComponent } from './inventory-visualisation.component';

describe('InventoryVisualisationComponent', () => {
  let component: InventoryVisualisationComponent;
  let fixture: ComponentFixture<InventoryVisualisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryVisualisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryVisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

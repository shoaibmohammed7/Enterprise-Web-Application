import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGroceriesComponent } from './show-groceries.component';

describe('ShowGroceriesComponent', () => {
  let component: ShowGroceriesComponent;
  let fixture: ComponentFixture<ShowGroceriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowGroceriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowGroceriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchagelistComponent } from './purchagelist.component';

describe('PurchagelistComponent', () => {
  let component: PurchagelistComponent;
  let fixture: ComponentFixture<PurchagelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchagelistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchagelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

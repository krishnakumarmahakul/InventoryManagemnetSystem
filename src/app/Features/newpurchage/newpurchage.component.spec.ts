import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpurchageComponent } from './newpurchage.component';

describe('NewpurchageComponent', () => {
  let component: NewpurchageComponent;
  let fixture: ComponentFixture<NewpurchageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewpurchageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewpurchageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

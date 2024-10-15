import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureAvailabilityComponent } from './feature-availability.component';

describe('FeatureAvailabilityComponent', () => {
  let component: FeatureAvailabilityComponent;
  let fixture: ComponentFixture<FeatureAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureAvailabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

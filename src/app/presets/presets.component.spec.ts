import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetsComponent } from './presets.component';

describe('PresetsComponent', () => {
  let component: PresetsComponent;
  let fixture: ComponentFixture<PresetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

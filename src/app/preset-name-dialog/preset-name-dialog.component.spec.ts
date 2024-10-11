import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetNameDialogComponent } from './preset-name-dialog.component';

describe('PresetNameDialogComponent', () => {
  let component: PresetNameDialogComponent;
  let fixture: ComponentFixture<PresetNameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresetNameDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresetNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

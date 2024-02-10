import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterPopularityReportComponent } from './character-popularity-report.component';

describe('CharacterPopularityReportComponent', () => {
  let component: CharacterPopularityReportComponent;
  let fixture: ComponentFixture<CharacterPopularityReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterPopularityReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacterPopularityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

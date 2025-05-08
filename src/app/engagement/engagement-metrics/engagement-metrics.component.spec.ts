import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementMetricsComponent } from './engagement-metrics.component';

describe('EngagementMetricsComponent', () => {
  let component: EngagementMetricsComponent;
  let fixture: ComponentFixture<EngagementMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngagementMetricsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngagementMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

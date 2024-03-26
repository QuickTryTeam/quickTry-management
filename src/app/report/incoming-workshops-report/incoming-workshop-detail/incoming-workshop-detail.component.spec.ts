import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingWorkshopDetailComponent } from './incoming-workshop-detail.component';

describe('IncomingWorkshopDetailComponent', () => {
  let component: IncomingWorkshopDetailComponent;
  let fixture: ComponentFixture<IncomingWorkshopDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncomingWorkshopDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncomingWorkshopDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

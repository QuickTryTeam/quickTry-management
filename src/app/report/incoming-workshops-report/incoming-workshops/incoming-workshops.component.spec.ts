import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingWorkshopsComponent } from './incoming-workshops.component';

describe('IncomingWorkshopsComponent', () => {
  let component: IncomingWorkshopsComponent;
  let fixture: ComponentFixture<IncomingWorkshopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncomingWorkshopsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncomingWorkshopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

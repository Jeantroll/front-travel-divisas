import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressformComponent } from './progressform.component';
import { LocationService } from '../../services/location.service';


describe('ProgressformComponent', () => {
  let component: ProgressformComponent;
  let fixture: ComponentFixture<ProgressformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressformComponent]
    });
    fixture = TestBed.createComponent(ProgressformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

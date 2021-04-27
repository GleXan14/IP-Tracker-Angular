import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpDataComponent } from './ip-data.component';

describe('IpDataComponent', () => {
  let component: IpDataComponent;
  let fixture: ComponentFixture<IpDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

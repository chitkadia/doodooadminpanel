import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusLeadsComponent } from './contactus-leads.component';

describe('ContactusLeadsComponent', () => {
  let component: ContactusLeadsComponent;
  let fixture: ComponentFixture<ContactusLeadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactusLeadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactusLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

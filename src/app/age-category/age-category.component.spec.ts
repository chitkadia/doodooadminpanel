import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeCategoryComponent } from './age-category.component';

describe('AgeCategoryComponent', () => {
  let component: AgeCategoryComponent;
  let fixture: ComponentFixture<AgeCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

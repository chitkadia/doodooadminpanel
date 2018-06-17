import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSubCategoryComponent } from './product-sub-category.component';

describe('ProductSubCategoryComponent', () => {
  let component: ProductSubCategoryComponent;
  let fixture: ComponentFixture<ProductSubCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSubCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

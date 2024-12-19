import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionstatevisualComponent } from './productionstatevisual.component';

describe('ProductionstatevisualComponent', () => {
  let component: ProductionstatevisualComponent;
  let fixture: ComponentFixture<ProductionstatevisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionstatevisualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionstatevisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

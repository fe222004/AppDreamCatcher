import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaPostComponent } from './tarjeta-post.component';

describe('TarjetaPostComponent', () => {
  let component: TarjetaPostComponent;
  let fixture: ComponentFixture<TarjetaPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarjetaPostComponent]
    });
    fixture = TestBed.createComponent(TarjetaPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

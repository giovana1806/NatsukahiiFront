import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSushiComponent } from './form-sushi.component';

describe('FormSushiComponent', () => {
  let component: FormSushiComponent;
  let fixture: ComponentFixture<FormSushiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSushiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSushiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

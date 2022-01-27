import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { By } from '@angular/platform-browser';

import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync
} from '@angular/core/testing';

import {
  SmsTelNumbersComponent,
  PhoneNumber
} from './sms-tel-numbers.component';
import { PhoneNumbersService } from '../services/phone-numbers.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SessionService } from '../services/session.service';
import { RadioComponent } from '../radio/radio.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

class RouterStub {
  navigate(params) {}
}

class PhoneNumbersServiceStub {
  phoneNumbers: PhoneNumber[] = [
    {
      id: '1',
      type: 'mobile',
      number: '07786767111'
    },
    {
      id: '2',
      type: 'mobile',
      number: '07786777222'
    }
  ];

  get() {
    return from([{ phoneNumbers: this.phoneNumbers }]);
  }
}

class SessionServiceStub {
  post() {
    return from([{ status: 'IN_PROGRESS', warn: null, error: null }]);
  }
}

describe('SmsTelNumbersComponent', () => {
  let component: SmsTelNumbersComponent;
  let fixture: ComponentFixture<SmsTelNumbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SmsTelNumbersComponent, RadioComponent, SpinnerComponent],
      imports: [FormsModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: PhoneNumbersService, useClass: PhoneNumbersServiceStub },
        { provide: SessionService, useClass: SessionServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsTelNumbersComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    // Hide component dispay in Karma.
    fixture.debugElement.nativeElement.style.visibility = 'hidden';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('phoneNumbers array length should be greater than 0', () => {
    expect(component.phoneNumbers.length > 0).toBeTruthy();
  });

  it('selecting phoneNumber should make form valid and enable Continue button', fakeAsync(() => {
    // Get nested RadioComponent element.
    const radioDebugElement = fixture.debugElement.query(
      By.directive(RadioComponent)
    );

    // Get first radio element.
    const radio = radioDebugElement.query(By.css('input[type="radio"]'));

    // Select radio.
    radio.triggerEventHandler('change', null);

    fixture.detectChanges();

    expect(component.form.invalid).toBeFalsy();
  }));

  it('selecting phoneNumber and clicking Continue should navigate to verifyPasscode', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    // Get nested RadioComponent element.
    const radioDebugElement = fixture.debugElement.query(
      By.directive(RadioComponent)
    );

    // Select radio.
    const radio = radioDebugElement.query(By.css('input[type="radio"]'));
    radio.triggerEventHandler('change', null);

    // Click Continue.
    const continueButton = fixture.debugElement.query(
      By.css('#continueButton')
    );
    continueButton.triggerEventHandler('click', null);

    // Check routed to verifyPasscode
    expect(spy).toHaveBeenCalledWith(['/verifyPasscode']);
  });
});

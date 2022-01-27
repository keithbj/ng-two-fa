import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { By } from '@angular/platform-browser';

import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync
} from '@angular/core/testing';

import { VerifyPasscodeComponent } from './verify-passcode.component';
import { ValidateService } from '../services/validate.service';
import { DebugElement } from '@angular/core';

class RouterStub {
  navigate(params: any) {}
}

class ValidateServiceStub {
  post() {
    return from([{ status: 'VALIDATED', warn: null, error: null }]);
  }
}

describe('VerifyPasscodeComponent', () => {
  let component: VerifyPasscodeComponent;
  let fixture: ComponentFixture<VerifyPasscodeComponent>;

  let continueButtonEl: DebugElement;
  let passcodeEl: DebugElement;
  let passcode: AbstractControl;

  const validationRequired = 'required';
  const validationPattern = 'pattern';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyPasscodeComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ValidateService, useClass: ValidateServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyPasscodeComponent);
    component = fixture.componentInstance;
    continueButtonEl = fixture.debugElement.query(By.css('#continueButton'));
    passcodeEl = fixture.debugElement.query(By.css('#passcode'));
    passcode = component.form.get('passcode');
    fixture.detectChanges();
    // Hide component dispay in Karma.
    fixture.debugElement.nativeElement.style.visibility = 'hidden';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('passcode field validity', () => {
    expect(component.form.valid).toBeFalsy();

    let errors = {};
    errors = passcode.errors || {};
    expect(errors[validationRequired]).toBeTruthy();
    expect(component.form.valid).toBeFalsy();

    passcode.setValue('123a');
    errors = passcode.errors || {};
    expect(errors[validationPattern]).toBeTruthy();
    expect(component.form.valid).toBeFalsy();
    passcode.setValue('1234');
    errors = passcode.errors || {};
    expect(errors[validationPattern]).toBeTruthy();
    expect(component.form.valid).toBeFalsy();
  });

  it('entering valid passcode and clicking Continue should navigate to /message', fakeAsync(() => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    passcodeEl.nativeElement.value = '123456';
    passcodeEl.nativeElement.dispatchEvent(new Event('input'));
    tick();

    // console.log('VVV', passcodeEl.nativeElement.value, passcode.value);
    // passcode.setValue('123456');

    expect(component.form.invalid).toBeFalsy();

    continueButtonEl.triggerEventHandler('click', null);

    // Check routed to /message
    expect(spy).toHaveBeenCalledWith(['/message'], {
      state: { data: { message: 'Return "Validation Success" status.' } }
    });
  }));
});

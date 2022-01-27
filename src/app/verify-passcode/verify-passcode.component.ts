import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppError } from '../common/app-error';
import { BadInput } from './../common/bad-input';
import { ValidateService } from '../services/validate.service';

export interface ResponseBody {
  status: string;
  warnings: string[];
  errors: string[];
}

@Component({
  selector: 'app-verify-passcode',
  templateUrl: './verify-passcode.component.html',
  styleUrls: ['./verify-passcode.component.scss']
})
export class VerifyPasscodeComponent implements OnInit {
  constructor(private router: Router, private service: ValidateService) {}

  form = new FormGroup({
    passcode: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{6}')
    ])
  });

  get passcode() {
    return this.form.get('passcode');
  }

  handleSubmit() {
    console.log('passcode', this.form.value);
    this.service.post(this.form.value).subscribe(
      (response: ResponseBody) => {
        console.log('response', response);

        if (response.status === 'VALIDATED') {
          this.router.navigate(['/message'], {
            state: { data: { message: 'Return "Validation Success" status.' } }
          });
        } else {
          console.log('Not VALIDATED', response);
          this.passcode.setErrors({
            invalidPasscode: true
          });
        }
      },
      (error: AppError) => {
        if (error instanceof BadInput) {
          this.passcode.setErrors({
            invalidPasscode: true
          });
        } else {
          // Forward to global AppErrorHandler.
          throw error;
        }
      }
    );
  }

  handleInput() {
    // console.log('Keyup errors', this.passcode.errors); Debuging use
  }

  handleNewCode() {
    this.router.navigate(['/']);
  }

  handleCancel() {
    this.router.navigate(['/message'], {
      state: { data: { message: 'Return "Cancel" status' } }
    });
  }

  handleCantDoThis() {
    this.router.navigate(['/message'], {
      state: { data: { message: 'Return "Can\'t do this" status.' } }
    });
  }

  ngOnInit() {}
}

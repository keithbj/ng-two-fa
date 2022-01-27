import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PhoneNumbersService } from '../services/phone-numbers.service';
import { SessionService } from '../services/session.service';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { ResponseBody } from '../verify-passcode/verify-passcode.component';
import { BadInput } from '../common/bad-input';

export interface PhoneNumber {
  id: string;
  type: string;
  number: string;
}

@Component({
  selector: 'app-sms-tel-numbers',
  templateUrl: './sms-tel-numbers.component.html',
  styleUrls: ['./sms-tel-numbers.component.scss']
})
export class SmsTelNumbersComponent implements OnInit {
  phoneNumbers: PhoneNumber[];
  checked: boolean;

  constructor(
    private router: Router,
    private numbersService: PhoneNumbersService,
    private sessionService: SessionService
  ) {}

  form = new FormGroup({
    number: new FormControl('', [])
  });

  handleSubmit() {
    console.log('phoneNumber', this.form.value);

    this.sessionService.post(this.form.value).subscribe(
      (response: ResponseBody) => {
        console.log('response', response);

        if (response.status === 'IN_PROGRESS') {
          this.router.navigate(['/verifyPasscode']);
        } else {
          console.log('Not IN_PROGRESS', response);
          this.router.navigate(['/systemError']);
        }
      },
      (error: AppError) => {
        if (error instanceof BadInput) {
          this.router.navigate(['/systemError']);
        } else {
          // Forward to global AppErrorHandler.
          throw error;
        }
      }
    );
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

  handleSelection(value: string) {
    // console.log('handleSelection', value);
  }

  ngOnInit() {
    // console.log('ZZZ');
    this.numbersService.get().subscribe(
      response => {
        // console.log('ZZZ response', response);
        this.phoneNumbers = (response as any).phoneNumbers;
        // console.log('ZZZ phoneNumbers', this.phoneNumbers);
        if (this.phoneNumbers.length === 1) {
          this.checked = true;
        }
      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          alert('Not found error. Just example of instanceof usage');
        } else {
          // Forward to global AppErrorHandler.
          throw error;
        }
      }
    );
  }
}

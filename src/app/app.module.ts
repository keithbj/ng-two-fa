import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SmsTelNumbersComponent } from './sms-tel-numbers/sms-tel-numbers.component';
import { VerifyPasscodeComponent } from './verify-passcode/verify-passcode.component';
import { MessageComponent } from './message/message.component';
import { SystemErrorComponent } from './system-error/system-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PhoneNumbersService } from './services/phone-numbers.service';
import { SessionService } from './services/session.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';
import { AppErrorHandler } from './common/app-error-handler';
import { ValidateService } from './services/validate.service';
import { RouterTestingModule } from '@angular/router/testing';
import { RadioComponent } from './radio/radio.component';

const appRoutes: Routes = [
  { path: '', component: SmsTelNumbersComponent },
  { path: 'verifyPasscode', component: VerifyPasscodeComponent },
  { path: 'message', component: MessageComponent },
  { path: 'systemError', component: SystemErrorComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SmsTelNumbersComponent,
    VerifyPasscodeComponent,
    MessageComponent,
    SystemErrorComponent,
    NotFoundComponent,
    SpinnerComponent,
    RadioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
      // ,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    ReactiveFormsModule,
    RouterTestingModule
  ],
  providers: [
    HttpClient,
    PhoneNumbersService,
    SessionService,
    ValidateService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: Window, useValue: window }
  ],
  bootstrap: [AppComponent],
  exports: [FormsModule, ReactiveFormsModule]
})
export class AppModule {}

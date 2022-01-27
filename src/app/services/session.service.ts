import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SessionService extends DataService {
  constructor(httpClient: HttpClient) {
    super(
      'http://localhost:3000/authentication/v1/sms-otp/session',
      httpClient
    );
  }
}

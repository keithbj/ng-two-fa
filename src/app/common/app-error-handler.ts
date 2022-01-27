import { ErrorHandler } from '@angular/core';
import { AppError } from './app-error';
import { HttpErrorResponse } from '@angular/common/http';

export class AppErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    if (error instanceof AppError) {
      if (error.originalError instanceof HttpErrorResponse) {
        alert(error.originalError.message);
        console.log(error.originalError);
        return;
      }
    }
    alert('Unexpected error occured');
    console.log(error);
  }
}

import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DataService {
  constructor(private url: string, private http: HttpClient) {}

  get() {
    return this.http.get(this.url).pipe(catchError(this.handleError));
  }

  post(resource) {
    // console.log('post', resource);
    return this.http
      .post(this.url, resource)
      .pipe(catchError(this.handleError));
  }

  put(resource) {
    return this.http
      .put(this.url + '/' + resource.id, resource)
      .pipe(catchError(this.handleError));
  }

  delete(id) {
    return this.http
      .delete(this.url + '/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      console.log('BadInput', error);
      return throwError(new BadInput(error));
    }

    if (error.status === 404) {
      console.log('NotFoundError', error);
      return throwError(new NotFoundError(error));
    }

    return throwError(new AppError(error));
  }
}

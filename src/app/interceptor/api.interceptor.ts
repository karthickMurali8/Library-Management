import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private toaster: ToastrService
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (token) {
        req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`)});
    }

    return next.handle(req).pipe(catchError(res => {
        // if (res instanceof HttpErrorResponse) {
        // }
        // console.log(res);
        this.toaster.error(res.error.message);
        // this.router.navigate(['common/login']);
        return of(res);
    }));
  }
}

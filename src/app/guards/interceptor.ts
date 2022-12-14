import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class InterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string | null = localStorage.getItem('JWT');
    if (token) {
      let request = req.clone({
        setHeaders: {
          Authorization: 'bearer ' + token,
        },
      });

      return next.handle(request);
    } else {
      return next.handle(req);
    }
  }
}

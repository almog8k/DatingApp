import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";


@Injectable()

export class ErrorInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error.status === 401) {
                    return throwError(() => error.statusText);
                }
                if (error instanceof HttpErrorResponse) {
                    const aplicationError = error.headers.get('Application-Error');
                    if (aplicationError) {
                        return throwError(() => aplicationError);
                    }
                    const serverError = error.error;
                    let modalStateError = '';
                    if (serverError.errors && typeof serverError.errors === 'object') {
                        for (const key in serverError.errors) {
                            if (serverError.errors[key]) {
                                modalStateError += serverError.errors[key] + '\n';
                            }
                        }
                    }
                    return throwError(() => modalStateError || serverError || 'Server Error');
                }
                return throwError(() => error);
            })
        );
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class DeduplicationInterceptor implements NestInterceptor {
  private processingRequests: Map<string, number> = new Map();
  private timeoutDuration = 1000; // 1 second in milliseconds

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const data = context.getArgs()[0]; // Access data from the context

    if (data && data.dto.phoneNumber) {
      const phoneNumber = data.dto.phoneNumber;
      const lastRequestTimestamp = this.processingRequests.get(phoneNumber);

      if (lastRequestTimestamp && Date.now() - lastRequestTimestamp < this.timeoutDuration) {
        // User made a request less than 1 second ago, reject the request
        return throwError(new Error('Rate limit exceeded. Please wait.'));
      }

      this.processingRequests.set(phoneNumber, Date.now());

      return next.handle().pipe(
        mergeMap((response) => {
          // Request is completed, remove the phone number from the map after 1 second
          setTimeout(() => {
            this.processingRequests.delete(phoneNumber);
          }, this.timeoutDuration);

          return response;
        }),
        catchError((error) => {
          // Request encountered an error, remove the phone number from the map immediately
          this.processingRequests.delete(phoneNumber);
          return throwError(error);
        })
      );
    } else {
      return throwError(new Error('Invalid request: Missing phoneNumber'));
    }
  }
}

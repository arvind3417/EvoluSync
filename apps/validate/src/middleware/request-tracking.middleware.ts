// // request-tracking.middleware.ts
// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';

// const requestStore: Record<string, number> = {};

// @Injectable()
// export class RequestTrackingMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     const phoneNumber = req.body.phoneNumber;
//     console.log('====================================');
//     console.log("phonenumber");
//     console.log('====================================');
//     console.log(phoneNumber);
    

//     if (requestStore[phoneNumber]) {
//       const lastRequestTime = requestStore[phoneNumber];
//       const currentTime = Date.now();
//       const timeDiff = currentTime - lastRequestTime;

//       // Set a time threshold (e.g., 60 seconds) to prevent the same request within a short timeframe
//       if (timeDiff < 60000) {
//         return res.status(429).json({ message: 'Too many requests. Please try again later.' });
//       }
//     }

//     // Store the timestamp of the current request
//     requestStore[phoneNumber] = Date.now();

//     next();
//   }
// }

import { Injectable, NestMiddleware, ExecutionContext } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

const requestStore: Record<string, number> = {};

@Injectable()
export class RequestTrackingMiddleware implements NestMiddleware {
  use(context: ExecutionContext, next: () => void) {
    const payload = context.getArgs()[0]; // Access the payload data from the RPC message
    const phoneNumber = payload.data.phoneNumber;
    console.log('requestmiddlewae');
    console.log(phoneNumber);
    console.log('====================================');
    if (requestStore[phoneNumber]) {
      const lastRequestTime = requestStore[phoneNumber];
      const currentTime = Date.now();
      const timeDiff = currentTime - lastRequestTime;

      // Set a time threshold (e.g., 60 seconds) to prevent the same request within a short timeframe
      if (timeDiff < 60000) {
        throw new RpcException('Too many requests. Please try again later.');
      }
    }

    // Store the timestamp of the current request
    requestStore[phoneNumber] = Date.now();

    // Continue with the next middleware or handler function
    next();
  }
}

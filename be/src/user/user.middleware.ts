import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HttpService } from '@nestjs/axios';

const undefinedTokenError = () => {
  throw new HttpException(
    {
      status: HttpStatus.FORBIDDEN,
      error: 'Error: Undefined Token',
    },
    HttpStatus.FORBIDDEN,
  );
};

// TODO: Authentication
// TODO: Authorization
@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly httpService: HttpService) {}
  use(req: Request, res: Response, next: NextFunction) {
    //if (req.body.token === undefined) {
    //  undefinedTokenError();
    //}
    console.log(req.body.token);
    next();
  }
}

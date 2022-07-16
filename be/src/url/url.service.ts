import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlService {
  sayHello(): string {
    return 'Hello';
  }
}

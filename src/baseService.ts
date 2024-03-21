import { HttpStatus } from '@nestjs/common';

interface Response {
  statusCode: HttpStatus;
  message: 'success' | 'failed';
  data?: any;
}

export class BaseService {
  success({ data, message, statusCode }: Response) {
    return {
      statusCode,
      message,
      data,
    };
  }
}

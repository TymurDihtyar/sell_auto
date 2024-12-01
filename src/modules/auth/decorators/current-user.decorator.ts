import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { IUserData } from '../interfaces/user-data.interface';

export const CurrentUser = createParamDecorator<IUserData>(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user as IUserData;
  },
);

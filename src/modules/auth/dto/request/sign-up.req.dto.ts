import { PickType } from '@nestjs/swagger';

import { BaseUserRequestDto } from '../../../users/dto/request/base-user.req.dto';

export class SignUpRequestDto extends PickType(BaseUserRequestDto, [
  'name',
  'email',
  'password',
]) {}

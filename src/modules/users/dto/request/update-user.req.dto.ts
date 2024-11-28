import { PickType } from '@nestjs/swagger';

import { BaseUserRequestDto } from './base-user.req.dto';

export class UpdateUserRequestDto extends PickType(BaseUserRequestDto, [
  'name',
  'image',
]) {}

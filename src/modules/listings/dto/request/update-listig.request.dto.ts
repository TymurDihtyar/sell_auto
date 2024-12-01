import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

import { ECurrency } from '../../enums/currency.enum';

export class UpdateListingRequestDto {
  @IsString()
  description: string;

  @IsInt()
  price: number;

  @IsString()
  brand: string;

  @IsString()
  model: string;

  @ApiProperty({ enum: ECurrency })
  @IsString()
  currency: ECurrency;
}

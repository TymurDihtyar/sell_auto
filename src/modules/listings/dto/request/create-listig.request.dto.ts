import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

import { ECurrency } from '../../enums/currency.enum';

export class CreateListingRequestDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  price: number;

  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsInt()
  year: number;

  @ApiProperty({ enum: ECurrency })
  @IsString()
  currency: ECurrency;
}

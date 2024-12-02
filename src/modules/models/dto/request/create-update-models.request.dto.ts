import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUpdateModelRequestDto {
  @ApiProperty({ example: 'm3' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'bmw' })
  @IsString()
  brand: string;
}

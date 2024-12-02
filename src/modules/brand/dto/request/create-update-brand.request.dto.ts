import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUpdateBrandRequstDto {
  @ApiProperty({ example: 'bmw' })
  @IsString()
  name: string;
}

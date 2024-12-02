import { Exclude } from 'class-transformer';

@Exclude()
export class BrandResponseDto {
  id: string;
  name: string;
}

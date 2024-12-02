import { Exclude, Expose } from 'class-transformer';

import { BrandsEntity } from '../../../../database/entities/brands.entity';

@Exclude()
export class ModelsResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  brand?: Partial<BrandsEntity>;
}

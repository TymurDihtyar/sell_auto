import { BrandsEntity } from '../../../database/entities/brands.entity';
import { BrandResponseDto } from '../dto/responce/brand.response.dto';
import { BrandListResponseDto } from '../dto/responce/brand-list.response.dto';

export class BrandMapper {
  public static toResponseCreateDto(
    brandsEntity: BrandsEntity,
  ): BrandResponseDto {
    return {
      name: brandsEntity.name,
      id: brandsEntity.id,
    };
  }
  public static toListResponseDto(
    entities: BrandsEntity[],
  ): BrandListResponseDto {
    return {
      data: entities.map(this.toResponseCreateDto),
    };
  }
}

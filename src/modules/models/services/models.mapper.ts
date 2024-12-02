import { ModelsEntity } from '../../../database/entities/models.entity';
import { BrandMapper } from '../../brand/services/brand.mapper';
import { ModelsResponseDto } from '../dto/responce/models.response.dto';
import { ModelsListResponseDto } from '../dto/responce/models-list.response.dto';

export class ModelsMapper {
  public static toResponseModelCreateDto(
    modelsEntity: ModelsEntity,
  ): ModelsResponseDto {
    return {
      id: modelsEntity.id,
      name: modelsEntity.name,
      brand: modelsEntity.brands
        ? BrandMapper.toResponseCreateDto(modelsEntity.brands)
        : null,
    };
  }

  public static toListModelResponseDto(
    entities: ModelsEntity[],
  ): ModelsListResponseDto {
    return {
      data: entities.map((entity) => this.toResponseModelCreateDto(entity)),
    };
  }
}

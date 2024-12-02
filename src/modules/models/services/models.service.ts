import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { BrandRepository } from '../../repository/services/brand.repository';
import { ModelRepository } from '../../repository/services/model.repository';
import { CreateUpdateModelRequestDto } from '../dto/request/create-update-models.request.dto';
import { ModelsResponseDto } from '../dto/responce/models.response.dto';
import { ModelsListResponseDto } from '../dto/responce/models-list.response.dto';
import { ModelsMapper } from './models.mapper';

@Injectable()
export class ModelsService {
  constructor(
    private readonly modelRepository: ModelRepository,
    private readonly brandRepository: BrandRepository,
  ) {}

  public async create(
    dto: CreateUpdateModelRequestDto,
  ): Promise<ModelsResponseDto> {
    const isBrandExist = await this.brandRepository.findOneBy({
      name: dto.brand,
    });
    if (!isBrandExist) {
      throw new ConflictException('Brand with this name not found');
    }

    const isModelExist = await this.modelRepository.findOneBy({
      name: dto.name,
    });
    if (isModelExist) {
      throw new ConflictException('Model with this name already exists');
    }

    const modelsEntity = await this.modelRepository.save(
      this.modelRepository.create({
        name: dto.name,
        brand_id: isBrandExist.id,
      }),
    );

    return ModelsMapper.toResponseModelCreateDto(modelsEntity);
  }

  public async findAllByBrandName(
    brandName: string,
  ): Promise<ModelsListResponseDto> {
    const isBrandExist = await this.brandRepository.findOneBy({
      name: brandName,
    });
    if (!isBrandExist) {
      throw new ConflictException('Brand with this name not found');
    }

    const findAllModel = await this.modelRepository.findBy({
      brand_id: isBrandExist.id,
    });

    return ModelsMapper.toListModelResponseDto(findAllModel);
  }

  public async update(
    modelName: string,
    dto: CreateUpdateModelRequestDto,
  ): Promise<ModelsResponseDto> {
    const modelEntity = await this.modelRepository.findOneBy({
      name: modelName,
    });
    if (!modelEntity) {
      throw new UnprocessableEntityException(
        "Model with this name doesn't exist",
      );
    }

    const isBrandExist = await this.brandRepository.findOneBy({
      name: dto.brand,
    });
    if (!isBrandExist) {
      throw new ConflictException('Brand with this name not found');
    }

    const updatedModel = await this.modelRepository.save({
      ...modelEntity,
      name: dto.name,
      brand_id: isBrandExist.id,
    });

    return ModelsMapper.toResponseModelCreateDto(updatedModel);
  }

  public async remove(modelName: string) {
    const modelEntity = await this.modelRepository.findOneBy({
      name: modelName,
    });

    if (!modelEntity) {
      throw new UnprocessableEntityException(
        "Model with this name doesn't exist",
      );
    }

    await this.modelRepository.remove(modelEntity);
  }
}

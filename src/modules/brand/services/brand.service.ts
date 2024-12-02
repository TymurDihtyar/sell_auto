import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { BrandRepository } from '../../repository/services/brand.repository';
import { CreateUpdateBrandRequstDto } from '../dto/request/create-update-brand.request.dto';
import { BrandResponseDto } from '../dto/responce/brand.response.dto';
import { BrandListResponseDto } from '../dto/responce/brand-list.response.dto';
import { BrandMapper } from './brand.mapper';

@Injectable()
export class BrandService {
  constructor(private brandRepository: BrandRepository) {}
  public async create(
    dto: CreateUpdateBrandRequstDto,
  ): Promise<BrandResponseDto> {
    const isBrandExist = await this.brandRepository.findOneBy({
      name: dto.name,
    });
    if (isBrandExist) {
      throw new ConflictException();
    }
    const brand = await this.brandRepository.save(
      this.brandRepository.create({ ...dto }),
    );
    return BrandMapper.toResponseCreateDto(brand);
  }

  public async findAll(): Promise<BrandListResponseDto> {
    const allBrands = await this.brandRepository.find();
    return BrandMapper.toListResponseDto(allBrands);
  }

  public async findOne(brand: string): Promise<BrandResponseDto> {
    const one = await this.brandRepository.findOneBy({ name: brand });
    return BrandMapper.toResponseCreateDto(one);
  }

  public async update(
    brand: string,
    dto: CreateUpdateBrandRequstDto,
  ): Promise<BrandResponseDto> {
    const brandEntity = await this.brandRepository.findOneBy({
      name: brand,
    });
    if (!brandEntity) {
      throw new UnprocessableEntityException();
    }
    const one = await this.brandRepository.save({ ...brandEntity, ...dto });
    return BrandMapper.toResponseCreateDto(one);
  }

  public async remove(brand: string) {
    await this.brandRepository.remove(
      await this.brandRepository.findOneBy({ name: brand }),
    );
  }
}

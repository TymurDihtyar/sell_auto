import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { BrandRepository } from '../../modules/repository/services/brand.repository';
import { ModelRepository } from '../../modules/repository/services/model.repository';

@Injectable()
export class BrandAndModelGuard implements CanActivate {
  constructor(
    private brandRepository: BrandRepository,
    private modelRepository: ModelRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const brand = request.body.brand;
    const model = request.body.model;

    const brandIsExist = await this.brandRepository.findOneBy({ name: brand });
    if (!brandIsExist) {
      throw new UnprocessableEntityException('Brand not found');
    }
    const modelIsExist = await this.modelRepository.findOneBy({ name: model });
    if (!modelIsExist) {
      throw new UnprocessableEntityException('Model not found');
    }

    return true;
  }
}

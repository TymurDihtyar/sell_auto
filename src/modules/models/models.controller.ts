import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { CreateUpdateModelRequestDto } from './dto/request/create-update-models.request.dto';
import { ModelsResponseDto } from './dto/responce/models.response.dto';
import { ModelsListResponseDto } from './dto/responce/models-list.response.dto';
import { ModelsService } from './services/models.service';

@ApiTags('Models')
@Controller('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @SkipAuth()
  @ApiOperation({ summary: 'Admins and managers can create a model here' })
  @Post()
  public async create(
    @Body() dto: CreateUpdateModelRequestDto,
  ): Promise<ModelsResponseDto> {
    return await this.modelsService.create(dto);
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Retrieve all models by brand name' })
  @Get(':brandName')
  public async findAllByBrandName(
    @Param('brandName') brandName: string,
  ): Promise<ModelsListResponseDto> {
    return await this.modelsService.findAllByBrandName(brandName);
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Update a model' })
  @Put(':model')
  public async update(
    @Param('model') model: string,
    @Body() dto: CreateUpdateModelRequestDto,
  ): Promise<ModelsResponseDto> {
    return await this.modelsService.update(model, dto);
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Delete a model' })
  @Delete(':model')
  public async remove(@Param('model') model: string) {
    return await this.modelsService.remove(model);
  }
}

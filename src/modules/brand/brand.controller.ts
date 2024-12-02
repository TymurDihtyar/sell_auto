import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/guards/enums/role.enum';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { CreateUpdateBrandRequstDto } from './dto/request/create-update-brand.request.dto';
import { BrandResponseDto } from './dto/responce/brand.response.dto';
import { BrandListResponseDto } from './dto/responce/brand-list.response.dto';
import { BrandService } from './services/brand.service';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Roles(Role.Admin, Role.Manager)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin and Manager can create brand here' })
  @Post()
  public async create(
    @Body() dto: CreateUpdateBrandRequstDto,
  ): Promise<BrandResponseDto> {
    return await this.brandService.create(dto);
  }

  @SkipAuth()
  @Get()
  public async findAll(): Promise<BrandListResponseDto> {
    return await this.brandService.findAll();
  }

  @SkipAuth()
  @Get(':brand')
  public async findOne(
    @Param('brand') brand: string,
  ): Promise<BrandResponseDto> {
    return await this.brandService.findOne(brand);
  }

  @Roles(Role.Admin, Role.Manager)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin and Manager can update brand here' })
  @Put(':brand')
  public async update(
    @Param('brand') brand: string,
    @Body() dto: CreateUpdateBrandRequstDto,
  ): Promise<BrandResponseDto> {
    return await this.brandService.update(brand, dto);
  }

  @Roles(Role.Admin, Role.Manager)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin and Manager can delete brand here' })
  @Delete(':brand')
  public async remove(@Param('brand') brand: string): Promise<void> {
    return await this.brandService.remove(brand);
  }
}

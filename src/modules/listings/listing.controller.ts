import {
  Body,
  Controller,
  Delete,
  Get,
  NestInterceptor,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Roles } from '../../common/decorators/roles.decorator';
import { BrandAndModelGuard } from '../../common/guards/brand-model.guard';
import { Role } from '../../common/guards/enums/role.enum';
import { SellingLimitsGuard } from '../../common/guards/sell-limit.guard';
import { BannedWordsGuards } from '../../common/guards/word-control.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { FilesUploadDto } from '../aws/dto/files-upload.dto';
import { FileAmountValidationPipe } from '../aws/validator/fileAmountValidationPipe';
import { CreateListingRequestDto } from './dto/request/create-listig.request.dto';
import { ListingListRequestDto } from './dto/request/listig-list.request.dto';
import { UpdateListingRequestDto } from './dto/request/update-listig.request.dto';
import { ListingResponceDto } from './dto/response/listing.response.dto';
import { ListingListResponseDto } from './dto/response/listing-list.response.dto';
import { ListingsService } from './services/listings.service';

@ApiTags('Listing')
@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingsService) {}
  @SkipAuth()
  @ApiOperation({ summary: 'Get all Listings' })
  @Get()
  public async findAll(
    @Query() query: ListingListRequestDto,
  ): Promise<ListingListResponseDto> {
    return await this.listingService.findAll(query);
  }

  @Roles(Role.Admin, Role.Manager, Role.Seller)
  @UseGuards(BrandAndModelGuard, SellingLimitsGuard, BannedWordsGuards)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Post Listing' })
  @Post()
  public async create(
    @Body() dto: CreateListingRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<ListingResponceDto> {
    return await this.listingService.create(dto, userData);
  }

  @Roles(Role.Admin, Role.Manager, Role.Seller)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all my Listing' })
  @Get('my-listings')
  public async findMyListing(
    @Query() query: ListingListRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<ListingListResponseDto> {
    return await this.listingService.findMyListings(query, userData);
  }

  @ApiOperation({ summary: 'Get one Listing by id' })
  @Get(':listingId')
  @ApiBearerAuth()
  public async findOneById(
    @Param('listingId') listingId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<ListingResponceDto> {
    return await this.listingService.findOne(listingId, userData);
  }

  @Roles(Role.Admin, Role.Manager, Role.Seller)
  @ApiOperation({ summary: 'Change Listing' })
  @ApiBearerAuth()
  @Put(':listingId')
  public async update(
    @Param('listingId') listingId: string,
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateListingRequestDto,
  ): Promise<ListingResponceDto> {
    return await this.listingService.update(listingId, dto, userData);
  }

  @Roles(Role.Admin, Role.Manager, Role.Seller)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete Listing' })
  @Delete(':listingId')
  public async remove(
    @Param('listingId') listingId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.listingService.remove(listingId, userData);
  }

  @Post(':listingId/photos')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload Listing photos' })
  @UseInterceptors(FilesInterceptor('files') as unknown as NestInterceptor)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'listing photo',
    type: FilesUploadDto,
  })
  public async uploadPhotos(
    @UploadedFiles(new FileAmountValidationPipe())
    files: Express.Multer.File[],
    @Param('listingId') listingId: string,
  ): Promise<any> {
    return await this.listingService.uploadPhotos(files, listingId);
  }
}

import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Role } from '../../../common/guards/enums/role.enum';
import { ListingsEntity } from '../../../database/entities/listings.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { AwsService } from '../../aws/aws.service';
import { EFileType } from '../../aws/enums/file-type.enum';
import { CurrencyRepository } from '../../repository/services/currency.repository';
import { ImagesRepository } from '../../repository/services/images.repository';
import { ListingsRepository } from '../../repository/services/listins.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { CreateListingRequestDto } from '../dto/request/create-listig.request.dto';
import { ListingListRequestDto } from '../dto/request/listig-list.request.dto';
import { UpdateListingRequestDto } from '../dto/request/update-listig.request.dto';
import { ListingResponceDto } from '../dto/response/listing.response.dto';
import { ListingListResponseDto } from '../dto/response/listing-list.response.dto';
import { EStatus } from '../enums/status.enum';
import { ListingsMapper } from './listings.mapper';

@Injectable()
export class ListingsService {
  constructor(
    private readonly listingsRepository: ListingsRepository,
    private readonly currencyRepository: CurrencyRepository,
    private userRepository: UserRepository,
    private imagesRepository: ImagesRepository,
    private awsService: AwsService,
  ) {}
  public async create(dto: CreateListingRequestDto, userData: IUserData) {
    const newListingsEntity = await this.listingsRepository.save(
      this.listingsRepository.create({
        ...dto,
        user_id: userData.userId,
        status: EStatus.ACTIVE,
      }),
    );
    return ListingsMapper.toResponseCreateDto(newListingsEntity);
  }

  public async findAll(
    query: ListingListRequestDto,
  ): Promise<ListingListResponseDto> {
    const [entities, total] = await this.listingsRepository.findAll(query);
    return ListingsMapper.toListResponseDto(entities, total, query);
  }

  public async findOne(
    listingId: string,
    userData: IUserData,
  ): Promise<ListingResponceDto> {
    const entity = await this.listingsRepository.findOne({
      where: { id: listingId },
      relations: ['user'],
    });
    if (!entity) {
      throw new UnprocessableEntityException('Listing not found');
    }
    return ListingsMapper.toResponseDto(entity);
  }

  public async update(
    listingId: string,
    dto: UpdateListingRequestDto,
    userData: IUserData,
  ) {
    const listing = await this.findMyOneByIdOrThrow(listingId, userData);

    const newListing = await this.listingsRepository.save({
      ...listing,
      ...dto,
    });
    return ListingsMapper.toResponseCreateDto(newListing);
  }

  public async remove(listingId: string, userData: IUserData) {
    const listing = await this.findMyOneByIdOrThrow(listingId, userData);

    const photoArray = await this.imagesRepository.findBy({
      listings_id: listingId,
    });
    for (const photo of photoArray) {
      await this.awsService.deleteFile(photo.image_url);
      await this.imagesRepository.remove(photo);
    }
    await this.listingsRepository.remove(listing);
  }

  private async findMyOneByIdOrThrow(
    listingId: string,
    userData: IUserData,
  ): Promise<ListingsEntity> {
    const listing = await this.listingsRepository.findOneBy({
      id: listingId,
    });
    const user = await this.userRepository.findOneBy({
      id: userData.userId,
    });

    if (!listing) {
      throw new UnprocessableEntityException();
    }
    if (
      user.role === Role.Admin ||
      listing.user_id === userData.userId ||
      user.role === Role.Manager
    ) {
      return listing;
    }
    throw new ForbiddenException();
  }
  public async findMyListings(
    query: ListingListRequestDto,
    userData: IUserData,
  ): Promise<ListingListResponseDto> {
    const [entities, total] = await this.listingsRepository.findAllMyListings(
      query,
      userData,
    );
    return ListingsMapper.toListResponseDto(entities, total, query);
  }

  public async uploadPhotos(files: Express.Multer.File[], listingId: string) {
    const listing = await this.listingsRepository.findOne({
      where: { id: listingId },
      relations: ['image_url'],
    });
    if (!listing) {
      throw new UnprocessableEntityException('Listing not found');
    }
    if (listing.image_url && listing.image_url.length > 0) {
      for (const image of listing.image_url) {
        await this.awsService.deleteFile(image.image_url);
        await this.imagesRepository.remove(image);
      }
    }
    const pathFile = await this.awsService.uploadFiles(
      files,
      listingId,
      EFileType.LISTING,
    );
    for (const path of pathFile) {
      await this.imagesRepository.save({
        image_url: path,
        listings_id: listingId,
      });
    }
    return 'Success upload';
  }
}

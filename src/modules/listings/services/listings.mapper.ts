import { ListingsEntity } from '../../../database/entities/listings.entity';
import { UserMapper } from '../../users/services/user.mapper';
import { ListingListRequestDto } from '../dto/request/listig-list.request.dto';
import { ListingResponceDto } from '../dto/response/listing.response.dto';
import { ListingListResponseDto } from '../dto/response/listing-list.response.dto';

export class ListingsMapper {
  public static toResponseDto(listing: ListingsEntity): ListingResponceDto {
    return {
      id: listing.id,
      brand: listing.brand,
      model: listing.model,
      price: listing.price,
      currency: listing.currency,
      description: listing.description,
      created: listing.created,
      updated: listing.updated,
      status: listing.status,

      user: listing.user ? UserMapper.toResponseDto(listing.user) : null,
    };
  }

  public static toResponseCreateDto(
    listing: ListingsEntity,
  ): ListingResponceDto {
    return {
      id: listing.id,
      description: listing.description,
      brand: listing.brand,
      model: listing.model,
      price: listing.price,
      status: listing.status,
      currency: listing.currency,
      created: listing.created,
      updated: listing.updated,

      user: listing.user ? UserMapper.toResponseDto(listing.user) : null,
    };
  }

  public static toListResponseDto(
    entities: ListingsEntity[],
    total: number,
    query: ListingListRequestDto,
  ): ListingListResponseDto {
    return {
      data: entities.map(this.toResponseCreateDto),
      meta: {
        limit: query.limit,
        offset: query.offset,
        total,
      },
    };
  }
}

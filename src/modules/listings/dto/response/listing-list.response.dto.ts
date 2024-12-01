import { ListingResponceDto } from './listing.response.dto';

export class ListingListResponseDto {
  data: ListingResponceDto[];
  meta: {
    limit: number;
    offset: number;
    total: number;
  };
}

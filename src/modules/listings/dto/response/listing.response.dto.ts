import { UserResponseDto } from '../../../users/dto/resonse/user.res.dto';

export class ListingResponceDto {
  id: string;
  description: string;
  price: number;
  brand: string;
  model: string;
  currency: string;
  status: string;
  created: Date;
  updated: Date;

  user?: UserResponseDto;
}

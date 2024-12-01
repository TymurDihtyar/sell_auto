import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ListingsEntity } from '../../../database/entities/listings.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ListingListRequestDto } from '../../listings/dto/request/listig-list.request.dto';

@Injectable()
export class ListingsRepository extends Repository<ListingsEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ListingsEntity, dataSource.manager);
  }
  public async findAll(
    query: ListingListRequestDto,
  ): Promise<[ListingsEntity[], number]> {
    const qb = this.createQueryBuilder('listings');
    qb.addOrderBy('listings.created', 'DESC');

    qb.leftJoinAndSelect('listings.user', 'user');
    qb.take(query.limit);
    qb.skip(query.offset);
    return await qb.getManyAndCount();
  }

  public async findAllMyListings(
    query: ListingListRequestDto,
    userData: IUserData,
  ): Promise<[ListingsEntity[], number]> {
    const qb = this.createQueryBuilder('listings');
    qb.andWhere('user_id=:my', { my: userData.userId });
    qb.leftJoinAndSelect('listings.user', 'user');
    qb.addOrderBy('listings.created', 'DESC');
    qb.take(query.limit);
    qb.skip(query.offset);
    return await qb.getManyAndCount();
  }
  // public async averagePrice(query: ListingsEntity): Promise<number> {
  //   const qb = this.createQueryBuilder('listings');
  //   qb.where('listings.brand = :brand', { brand: query.brand });
  //   qb.andWhere('listings.model = :model', { model: query.model });
  //   qb.select('AVG(listings.priceFunc)', 'averagePrice');
  //   const result = await qb.getRawOne();
  //   const averagePrice = result ? parseFloat(result.averagePrice) || 0 : 0;
  //
  //   return averagePrice;
  // }
}

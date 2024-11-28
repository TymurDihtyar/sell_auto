// import {
//   BadRequestException,
//   CanActivate,
//   ExecutionContext,
//   Injectable,
// } from '@nestjs/common';
//
// import { ListingsRepository } from '../../modules/repository/services/listings.repository';
// import { UserRepository } from '../../modules/repository/services/user.repository';
// import { EAccountTypes } from '../../modules/users/enums/account-type.enum';
//
// @Injectable()
// export class SellingLimits implements CanActivate {
//   constructor(
//     private listingsRepository: ListingsRepository,
//     private userRepository: UserRepository,
//   ) {}
//   public async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const user_id = request.user.userId;
//     const userAccountType = await this.userRepository.findOneBy({
//       id: user_id,
//     });
//
//     const userAdvertisements = await this.listingsRepository.findBy({
//       user_id,
//     });
//
//     if (
//       userAdvertisements.length >= 1 &&
//       userAccountType.account_type === EAccountTypes.BASIC
//     ) {
//       throw new BadRequestException(
//         'Your account type can post only one Listing',
//       );
//     }
//     return true;
//   }
// }

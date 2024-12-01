// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
//
// import { TokenService } from '../../modules/auth/services/token.service';
// import { UserRepository } from '../../modules/repository/services/user.repository';
// import { ROLES_KEY } from '../decorators/roles.decorator';
// import { Role } from './enums/role.enum';
//
// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(
//     private reflector: Reflector,
//     private tokenService: TokenService,
//     private userRepository: UserRepository,
//   ) {}
//
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (!roles) {
//       return true;
//     }
//
//     const request = context.switchToHttp().getRequest();
//     const accessToken = request.get('Authorization')?.split('Bearer ')[1];
//     if (!accessToken) {
//       throw new UnauthorizedException();
//     }
//     const payload = await this.tokenService.verifyToken(accessToken);
//     if (!payload) {
//       throw new UnauthorizedException();
//     }
//
//     const user = await this.userRepository.findOneBy({
//       id: payload.userId,
//     });
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return roles.some((role) => user.role?.includes(role));
//   }
// }

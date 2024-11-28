import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { ConfigType, JWTConfig } from '../../../configs/config.type';
import { ІJwtPayload } from '../interfaces/jwt-payload.interface';
import { IToken } from '../interfaces/token.interface';

@Injectable()
export class TokenService {
  private jwtConfig: JWTConfig;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService<ConfigType>,
  ) {
    this.jwtConfig = this.configService.get<JWTConfig>('jwt');
  }

  public async generateAuthTokens(payload: ІJwtPayload): Promise<IToken> {
    const accessToken = await this.generateToken(payload);
    return { accessToken };
  }

  public async verifyToken(token: string): Promise<ІJwtPayload> {
    try {
      const secret = this.jwtConfig.accessTokenSecret;
      return await this.jwtService.verifyAsync(token, { secret });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  private async generateToken(payload: ІJwtPayload): Promise<string> {
    const secret = this.jwtConfig.accessTokenSecret;
    const expiresIn = this.jwtConfig.accessTokenExpiration;
    return await this.jwtService.signAsync(payload, { expiresIn, secret });
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { CreateUserDto } from '../user/dto/create-user.dto';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2';
import { CurrentUser } from './types/current-user';
import { LocalUser } from './types/local-user';
import { AuthValidationService } from './auth-validation.service';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { CreateRefreshTokenDto } from '../refresh-token/dto/create-refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
    private authValidationService: AuthValidationService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  async login(localUser: LocalUser, deviceInfo: string, ipAddress: string) {
    const tokens = await this.generateAndStoreTokens(
      localUser.id,
      deviceInfo,
      ipAddress,
    );
    return { ...localUser, ...tokens };
  }

  async logout(userId: string, refreshToken: string) {
    return this.refreshTokenService.delete(userId, refreshToken);
  }

  async logoutAllTokens(userId: string) {
    return this.refreshTokenService.deleteAllByUserId(userId);
  }

  async refreshToken(userId: string, refreshToken: string) {
    const tokens = await this.generateAndUpdateTokens(userId, refreshToken);
    return { id: userId, ...tokens };
  }

  async validateLocalUser(email: string, password: string): Promise<LocalUser> {
    return this.authValidationService.validateLocalUser(email, password);
  }

  async validateJwtUser(userId: string): Promise<CurrentUser> {
    return this.authValidationService.validateJwtUser(userId);
  }

  async validateRefreshToken(userId: string, refreshToken: string) {
    return this.authValidationService.validateRefreshToken(
      userId,
      refreshToken,
    );
  }

  private async generateTokens(userId: string) {
    const payload: AuthJwtPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);
    return { accessToken, refreshToken };
  }

  private async generateAndStoreTokens(
    userId: string,
    deviceInfo: string,
    ipAddress: string,
  ) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedRefreshToken = await argon2.hash(refreshToken);
    const createRefreshTokenDto: CreateRefreshTokenDto = {
      deviceInfo,
      ipAddress,
      hashedRefreshToken,
      user: userId,
    };

    await this.refreshTokenService.create(createRefreshTokenDto);
    return { accessToken, refreshToken };
  }

  private async generateAndUpdateTokens(
    userId: string,
    oldRefreshToken: string,
  ) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const newhashedRefreshToken = await argon2.hash(refreshToken);

    await this.refreshTokenService.updateHashedRefreshToken(
      userId,
      oldRefreshToken,
      newhashedRefreshToken,
    );
    return { accessToken, refreshToken };
  }
}

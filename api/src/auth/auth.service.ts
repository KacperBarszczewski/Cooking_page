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

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
    private authValidationService: AuthValidationService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  async login(localUser: LocalUser) {
    const tokens = await this.generateAndStoreTokens(localUser.id);
    return { ...localUser, ...tokens };
  }

  async logout(userId: string) {
    return this.userService.updateHashedRefreshToken(userId, null);
  }

  async refreshToken(userId: string) {
    const tokens = await this.generateAndStoreTokens(userId);
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

  private async generateAndStoreTokens(userId: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedRefreshToken = await argon2.hash(refreshToken);

    await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
    return { accessToken, refreshToken };
  }
}

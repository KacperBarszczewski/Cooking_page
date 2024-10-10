import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { CreateUserDto } from '../user/dto/create-user.dto';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async singUp(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  async validateUser(email: string, password: string): Promise<{ id: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return { id: user._id };
  }

  async login(userId: string) {
    // const payload: AuthJwtPayload = { sub: userId };
    // const token = this.jwtService.sign(payload);
    // const refreshToken = this.jwtService.sign(payload, this.refreshTokenConfig);
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);

    return { id: userId, accessToken, refreshToken };
  }

  async generateTokens(userId: string) {
    const payload: AuthJwtPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);
    return { accessToken, refreshToken };
  }

  async refreshToken(userId: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);

    return { id: userId, accessToken, refreshToken };
  }

  async validateRefreshToken(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);

    if (!user || !user.hashedRefreshToken)
      throw new UnauthorizedException('Invalid Refrash Token1');

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      '$2a$10$6xfrA6O/SpG.h1aKOW7wWelIrMrRcgj52WHUBDuZLqOOVMooeJuzG',
    );

    console.log(refreshTokenMatches);
    if (!refreshTokenMatches)
      throw new UnauthorizedException('Invalid Refrash Token2');

    return { id: userId };
  }

  async singOut(userId: string) {
    await this.userService.updateHashedRefreshToken(userId, null);
  }
}

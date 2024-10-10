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
    private refreshTokenConfi: ConfigType<typeof refreshJwtConfig>,
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

  login(userId: string) {
    const payload: AuthJwtPayload = { sub: userId };
    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, this.refreshTokenConfi);

    return { id: userId, token, refreshToken };
  }

  refreshToken(userId: string) {
    const payload: AuthJwtPayload = { sub: userId };
    const token = this.jwtService.sign(payload);
    return { id: userId, token };
  }
}

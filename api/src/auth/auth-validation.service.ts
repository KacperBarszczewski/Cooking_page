import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';

@Injectable()
export class AuthValidationService {
  constructor(
    private userService: UserService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async validateLocalUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return { id: user.id, name: user.name, role: user.role };
  }

  async validateJwtUser(userId: string) {
    const user = await this.userService.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');

    return { id: user._id, role: user.role };
  }

  async validateRefreshToken(userId: string, refreshToken: string) {
    const refreshTokenId =
      await this.refreshTokenService.findByUserIdAndRefreshToken(
        userId,
        refreshToken,
      );

    if (!refreshTokenId)
      throw new UnauthorizedException('Invalid Refresh Token');

    return { id: userId };
  }
}

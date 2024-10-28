import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import * as argon2 from 'argon2';

@Injectable()
export class AuthValidationService {
  constructor(private userService: UserService) {}

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
    const user = await this.userService.findByIdWithRefreshTokenList(userId);

    if (!user || !user.refreshTokenList)
      throw new UnauthorizedException('Invalid Refresh Token');

    const refreshTokenMatches = await Promise.all(
      user.refreshTokenList.map(async (tokenData) => {
        return await argon2.verify(tokenData.hashedRefreshToken, refreshToken);
      }),
    );

    if (!refreshTokenMatches.includes(true))
      throw new UnauthorizedException('Invalid Refresh Token');

    return { id: userId };
  }
}

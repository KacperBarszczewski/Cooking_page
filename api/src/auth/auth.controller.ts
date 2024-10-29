import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';
import { Public } from './decorators/public.decorator';
import { LocalUser } from './types/local-user';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Request() req, @Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto);
    const localUser: LocalUser = {
      id: user._id,
      name: user.name,
      role: user.role,
    };
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    return this.authService.login(localUser, userAgent, ip);
  }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  login(@Request() req) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    return this.authService.login(req.user, userAgent, ip);
  }

  @Post('refresh')
  @Public()
  @UseGuards(RefreshAuthGuard)
  refreshToken(@Req() req) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    return this.authService.refreshToken(req.user.id, userAgent, ip);
  }

  @Post('logout')
  @Public()
  @UseGuards(RefreshAuthGuard)
  logout(@Req() req) {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    this.authService.logout(req.user.id, refreshToken);
  }

  @Get('deviceInfo')
  @Public()
  getDeviceInfo(@Req() req): { ip: string; userAgent: string } {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    return { ip, userAgent };
  }
}

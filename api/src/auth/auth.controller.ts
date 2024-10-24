import {
  Body,
  Controller,
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
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from './decorators/public.decorator';
import { LocalUser } from './types/local-user';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.singUp(createUserDto);
    return this.authService.login(user._id);
  }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  login(@Request() req: { user: LocalUser }) {
    console.log(req);
    return this.authService.login(req.user);
  }

  @Post('refresh')
  @UseGuards(RefreshAuthGuard)
  refreshToken(@Req() req) {
    return this.authService.refreshToken(req.user.id);
  }

  @Post('signout')
  @UseGuards(JwtAuthGuard)
  singOut(@Req() req) {
    this.authService.singOut(req.user.id);
  }
}

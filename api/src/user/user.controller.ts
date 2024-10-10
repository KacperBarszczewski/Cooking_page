import { Controller, Get, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from '../auth/enums/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return this.userService.findById(req.user.id);
  }

  @Get()
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  getAllUsers() {
    return this.userService.getAll();
  }
}

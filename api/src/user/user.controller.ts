import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Role } from '../auth/enums/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  getProfile(@Req() req) {
    return this.userService.findById(req.user.id);
  }

  @Get()
  @Roles(Role.Admin)
  getAllUsers() {
    return this.userService.getAll();
  }
}

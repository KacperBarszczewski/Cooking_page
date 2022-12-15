import { Controller } from '@nestjs/common';
import { Get, Param } from '@nestjs/common/decorators';
import { UserDetails } from './user-details.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Get(':id')
    getUser(@Param('id') id: string): Promise<UserDetails | null> {
        return this.userService.findById(id);
    }


}

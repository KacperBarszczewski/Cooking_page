import { Controller, Delete, Get, Param, Req } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';

@Controller('refresh-token')
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Get('AllUserToken')
  getAll(@Req() req) {
    return this.refreshTokenService.findByUserIdWithOutHashedRefreshToken(
      req.user.id,
    );
  }

  @Delete(':id')
  deleteById(@Param('id') id: string, @Req() req) {
    return this.refreshTokenService.deleteByIdAndUserId(id, req.user.id);
  }
}

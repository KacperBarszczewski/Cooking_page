import { Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { RefreshTokenController } from './refresh-token.controller';
import {
  RefreshTokenData,
  RefreshTokenDataSchema,
} from './schemas/refresh-token.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RefreshTokenData.name, schema: RefreshTokenDataSchema },
    ]),
  ],
  controllers: [RefreshTokenController],
  providers: [RefreshTokenService],
  exports: [RefreshTokenService, MongooseModule],
})
export class RefreshTokenModule {}

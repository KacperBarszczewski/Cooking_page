import { Injectable } from '@nestjs/common';
import { RefreshTokenData } from './schemas/refresh-token.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectModel(RefreshTokenData.name)
    private refreshTokenModel: Model<RefreshTokenData>,
  ) {}

  async create(createRefreshTokenDto: CreateRefreshTokenDto) {
    const newRefreshToken = new this.refreshTokenModel(createRefreshTokenDto);
    return newRefreshToken.save();
  }
}

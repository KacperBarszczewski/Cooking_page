import { Injectable } from '@nestjs/common';
import { RefreshTokenData } from './schemas/refresh-token.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
import * as argon2 from 'argon2';

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

  async findByUserId(userId: string) {
    const refreshTokenList = await this.refreshTokenModel.find({
      user: userId,
    });
    return refreshTokenList;
  }

  async findByUserIdWithOutHashedRefreshToken(userId: string) {
    const refreshTokenList = await this.refreshTokenModel
      .find({
        user: userId,
      })
      .select('-hashedRefreshToken');
    return refreshTokenList;
  }

  async findByUserIdAndRefreshToken(userId: string, refreshToken: string) {
    const refreshTokenDataList = await this.findByUserId(userId);

    for (const tokenData of refreshTokenDataList) {
      const isMatch = await argon2.verify(
        tokenData.hashedRefreshToken,
        refreshToken,
      );
      if (isMatch) {
        return tokenData.id;
      }
    }
  }

  async updateHashedRefreshToken(
    userId: string,
    oldRefreshToken: string,
    newhashedRefreshToken: string,
  ) {
    const refreshTokenId = await this.findByUserIdAndRefreshToken(
      userId,
      oldRefreshToken,
    );

    return this.refreshTokenModel.findByIdAndUpdate(refreshTokenId, {
      hashedRefreshToken: newhashedRefreshToken,
    });
  }

  async delete(userId: string, refreshToken: string) {
    const refreshTokenId = await this.findByUserIdAndRefreshToken(
      userId,
      refreshToken,
    );

    return this.refreshTokenModel.findByIdAndDelete(refreshTokenId);
  }

  async deleteAllByUserId(userId: string) {
    return this.refreshTokenModel.deleteMany({ user: userId });
  }
}

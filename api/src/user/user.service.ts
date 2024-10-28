import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RefreshTokenData, User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOne({ email: createUserDto.email });

    if (user)
      throw new ConflictException('User with this email already exists');

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    return newUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).select('+password');
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id);

    if (!user) return null;

    return user;
  }

  async findByIdWithRefreshTokenList(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).select('+refreshTokenList');

    if (!user) return null;

    return user;
  }

  async updateHashedRefreshToken(
    userId: string,
    hashedRefreshToken: string,
    deviceInfo: string,
    ipAddress: string,
  ) {
    const refreshTokenData: RefreshTokenData = {
      deviceInfo,
      ipAddress,
      hashedRefreshToken,
    };
    return await this.userModel.findByIdAndUpdate(userId, {
      $push: { refreshTokenList: refreshTokenData },
    });
  }

  async removeRefreshToken(userId: string, refreshToken: string) {
    const user = await this.findByIdWithRefreshTokenList(userId);

    for (const refreshTokenData of user.refreshTokenList) {
      if (
        await argon2.verify(refreshTokenData.hashedRefreshToken, refreshToken)
      ) {
        await this.userModel.findByIdAndUpdate(userId, {
          $pull: {
            refreshTokenList: {
              hashedRefreshToken: refreshTokenData.hashedRefreshToken,
            },
          },
        });
      }
    }
  }

  async getAll() {
    return await this.userModel.find();
  }
}

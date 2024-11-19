import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import ms, { StringValue } from 'ms';
import { ConfigService } from '@nestjs/config';

@Schema({
  timestamps: true,
})
export class RefreshTokenData extends Document {
  @Prop()
  deviceInfo: string;

  @Prop()
  ipAddress: string;

  @Prop()
  hashedRefreshToken: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({
    type: Date,
    default: () => {
      const configService = new ConfigService();
      const expireDuration = configService.get<StringValue>(
        'REFRESH_JWT_EXPIRE_IN',
        '7d',
      );
      return new Date(Date.now() + ms(expireDuration));
    },
  })
  expiresAt: Date;
}

export const RefreshTokenDataSchema =
  SchemaFactory.createForClass(RefreshTokenData);

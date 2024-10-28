import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../auth/enums/role.enum';

export interface RefreshTokenData {
  deviceInfo: string;
  ipAddress: string;
  hashedRefreshToken: string;
}

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop({ select: false })
  refreshTokenList: RefreshTokenData[];

  @Prop({ type: [{ type: String, enum: Role }], default: [Role.User] })
  role: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);

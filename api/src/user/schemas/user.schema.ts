import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../auth/enums/role.enum';

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

  @Prop({ type: [{ type: String, enum: Role }], default: [Role.User] })
  role: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);

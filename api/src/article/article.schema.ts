import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Comment } from '../comment/schemas/comment.schema';
import { User } from '../user/schemas/user.schema';

export type ArticleDocument = HydratedDocument<Article>;

@Schema({ timestamps: true })
export class Article {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: [String] })
  ingredients: string[];

  @Prop({ type: Boolean, default: true })
  isVisible: boolean;

  @Prop({ type: String })
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }])
  comments: Comment[];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

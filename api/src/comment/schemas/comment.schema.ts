import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Article } from '../../article/article.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({
  timestamps: true,
})
export class Comment {
  @Prop()
  name: string;

  @Prop()
  text: string;

  @Prop({ default: true })
  isVisible: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Article' })
  article_id: Article;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

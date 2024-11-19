import {
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from '../../user/schemas/user.schema';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @IsOptional()
  @IsBoolean()
  readonly isVisible: boolean;

  @IsNotEmpty()
  readonly article_id: string;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}

import {
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from '../../auth/schemas/user.schema';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @IsNotEmpty()
  readonly article_id: string;

  @IsOptional()
  @IsBoolean()
  readonly isVisible: boolean;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}

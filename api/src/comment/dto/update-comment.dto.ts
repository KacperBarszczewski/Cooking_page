import { IsBoolean, IsEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '../../auth/schemas/user.schema';

export class UpdateCommentDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly text: string;

  @IsOptional()
  readonly article_id: string;

  @IsOptional()
  @IsBoolean()
  readonly isVisible: boolean;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}

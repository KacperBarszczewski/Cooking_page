import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
}

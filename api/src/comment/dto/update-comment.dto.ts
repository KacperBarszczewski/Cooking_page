import { IsBoolean, IsOptional, IsString } from 'class-validator';

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
}

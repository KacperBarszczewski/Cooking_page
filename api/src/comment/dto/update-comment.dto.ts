import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto {
  @IsOptional()
  @IsString()
  readonly text: string;

  @IsOptional()
  @IsBoolean()
  readonly isVisible: boolean;
}

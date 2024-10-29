import { IsNotEmpty } from 'class-validator';

export class CreateRefreshTokenDto {
  @IsNotEmpty()
  readonly deviceInfo: string;

  @IsNotEmpty()
  readonly ipAddress: string;

  @IsNotEmpty()
  readonly hashedRefreshToken: string;

  @IsNotEmpty()
  readonly user: string;
}

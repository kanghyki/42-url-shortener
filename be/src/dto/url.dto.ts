import { IsNotEmpty, IsString } from 'class-validator';

export class CreateURLDto {
  @IsString()
  @IsNotEmpty()
  originURL: string;
}

export class DeleteURLDto {
  @IsString()
  @IsNotEmpty()
  shortURL: string;
}

export class UpdateURLDto {
  @IsString()
  @IsNotEmpty()
  shortURL: string;

  @IsString()
  @IsNotEmpty()
  newURL: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateURLDTO {
  @IsString()
  @IsNotEmpty()
  originURL: string;
}

export class DeleteURLDTO {
  @IsString()
  @IsNotEmpty()
  shortURL: string;
}

export class UpdateURLDTO {
  @IsString()
  @IsNotEmpty()
  shortURL: string;

  @IsString()
  @IsNotEmpty()
  newURL: string;
}

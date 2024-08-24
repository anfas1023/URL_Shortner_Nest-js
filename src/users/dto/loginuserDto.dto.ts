import { IsString, IsEmail, MinLength } from 'class-validator';

export class loginuserDto {

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
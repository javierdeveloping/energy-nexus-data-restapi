import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'myuser@mockmail.com',
    description: 'User email',
    nullable: false,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example:
      'For this application, especially with HTTP, DO NOT insert passwords that can compromise your other services or accounts. Passwords are not going to be encrypted using HTTP. This field should be the password that was used to create a user for this application (no recovery service yet).',
    description:
      'For this application, especially with HTTP, DO NOT insert passwords that can compromise your other services or accounts. Passwords are not going to be encrypted using HTTP. This field should be the password that was used to create a user for this application (no recovery service yet).',
    nullable: false,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;
}

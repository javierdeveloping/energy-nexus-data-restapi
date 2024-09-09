import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'myuser@mockmail.com',
    description: 'Valid user mail to register',
    nullable: false,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example:
      'The password must have a Uppercase, lowercase letter and a number',
    description:
      'The password must have a Uppercase, lowercase letter and a number',
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

  @ApiProperty({
    example: 'Freddy Mock Energy',
    description: 'Fullname of the user',
    nullable: false,
  })
  @IsString()
  @MinLength(1)
  fullName: string;
}

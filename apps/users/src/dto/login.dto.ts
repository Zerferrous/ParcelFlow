import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginRequestDto {
  @IsNotEmpty({ message: 'The email address must not be empty' })
  @IsString({ message: 'The email address must be a string' })
  @IsEmail({}, { message: 'Incorrect email format' })
  email: string;

  @IsNotEmpty({ message: 'The password must not be empty' })
  @IsString({ message: 'The password must be a string' })
  @Length(4, 256, {
    message:
      'The password must be longer than 3 and shorter than 257 characters.',
  })
  password: string;
}

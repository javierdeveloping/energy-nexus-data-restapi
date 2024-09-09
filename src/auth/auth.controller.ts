import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { APPLICATION_API_TAGS } from 'src/swagger.config';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator.ts.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';

@ApiTags(APPLICATION_API_TAGS.AUTH)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Create a new user',
    description:
      'This endpoint creates a new user with the provided details. In this case, with unsecured HTTP protocol, never insert passwords that could compromise other of your services or accounts',
  })
  @ApiResponse({
    status: 201,
    description: 'User was created',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login user',
    description:
      'This endpoint retrieves a Json Web Token that user can use to interact with some protected endpoints. In this case, with unsecured HTTP protocol, never insert passwords that could compromise other of your services or accounts',
  })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-auth-status')
  @ApiOperation({
    summary: 'Refresh Json Web Token',
    description:
      'This endpoint allows an already logged user to get a refreshed JWT. A valid JWT is required in order to verify user had already been logged in',
  })
  @ApiBearerAuth('access-token')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }
}

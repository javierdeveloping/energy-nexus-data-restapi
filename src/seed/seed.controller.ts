import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator.ts.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { ValidRoles } from 'src/auth/interfaces';
import { APPLICATION_API_TAGS } from 'src/swagger.config';
import { SeedService } from './seed.service';

@ApiTags(APPLICATION_API_TAGS.SEED)
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @Auth(ValidRoles.admin)
  @ApiOperation({
    summary: 'Fresh seed of the database',
    description: 'This endpoint deletes and then seeds the database',
  })
  @ApiResponse({
    status: 200,
    description: 'Seed successfully executed',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @ApiBearerAuth('access-token')
  executeSeed(@GetUser() user: User) {
    return this.seedService.executeSeed(user);
  }
}

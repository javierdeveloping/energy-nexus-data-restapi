import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
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
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { APPLICATION_API_TAGS } from 'src/swagger.config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities';
import { ProductsService } from './products.service';

@ApiTags(APPLICATION_API_TAGS.PRODUCTS)
@Controller('products')
// @Auth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth(ValidRoles.admin)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Create a new product',
    description:
      'This endpoint creates a new protected with the provided details. Required user role: admin',
  })
  @ApiResponse({
    status: 201,
    description: 'Product was created',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  create(@Body() createProductDto: CreateProductDto, @GetUser() user: User) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  @ApiOperation({
    summary: 'Find all the products using pagination',
    description:
      'This endpoint retrieves a list of products in the database using pagination parameters',
  })
  @ApiResponse({
    status: 200,
    description: 'Products list',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':term')
  @Get()
  @ApiOperation({
    summary: 'Find a specific product',
    description:
      'This endpoint retrieves a product based on its title, slug or product id',
  })
  @ApiResponse({
    status: 200,
    description: 'Product',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  findOne(@Param('term') term: string) {
    return this.productsService.findOnePlain(term);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Updates a product',
    description:
      'This endpoint updates an existing product. Required user role: admin',
  })
  @ApiResponse({
    status: 200,
    description: 'Updated product',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User,
  ) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Deleted product',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @ApiBearerAuth('access-token')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export enum PRODUCT_TYPES {
  FUTURE = 'future',
  CFD = 'cfd',
  STOCK = 'stock',
  OUT_OF_STANDARD = 'out of standard',
}

export class CreateProductDto {
  @ApiProperty({
    description: 'Product title (unique)',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({})
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({})
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({ enum: Object.values(PRODUCT_TYPES) })
  @IsIn(Object.values(PRODUCT_TYPES))
  type: string;
}

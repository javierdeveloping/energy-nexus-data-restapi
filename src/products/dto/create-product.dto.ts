import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';

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

  @ApiProperty({ enum: ['futures', 'cfd', 'stock', 'out of standard'] })
  @IsIn(['futures', 'cfd', 'stock', 'out of standard'])
  type: string;
}

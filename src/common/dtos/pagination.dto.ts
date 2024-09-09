import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  //query parameters come as string
  //enable implicit conversion to true is another way of doing this
  @ApiProperty({
    default: 10,
    description: 'How many rows do you want to retrieve?',
  })
  @Type(() => Number) //transform query parameters that come as string to number
  @IsOptional()
  @Min(0)
  @IsInt()
  limit?: number;

  @ApiProperty({
    default: 0,
    description: 'How many rows do you want to skip?',
  })
  @Type(() => Number)
  @IsOptional()
  @Min(0)
  @IsInt()
  offset?: number;
}

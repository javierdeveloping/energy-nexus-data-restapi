import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  //query parameters come as string
  //enable implicit conversion to true is another way of doing this
  @Type(() => Number) //transform query parameters that come as string to number
  @IsOptional()
  @Min(0)
  @IsInt()
  limit?: number;

  @Type(() => Number)
  @IsOptional()
  @Min(0)
  @IsInt()
  offset?: number;
}

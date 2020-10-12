import { IsNumberString, IsOptional } from 'class-validator';

export class PaginationOptionsDTO {
  @IsOptional()
  @IsNumberString()
  offset: number;
  @IsOptional()
  @IsNumberString()
  limit: number;
}
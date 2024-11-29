import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateSupplyDetailsDto {
  @ApiProperty()
  @IsOptional()
  @MaxLength(10, {
    message: 'Parameter is too long. Maximum length is 10 characters.',
  })
  @IsString()
  parameter: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(10, {
    message: 'Unit is too long. Maximum length is 10 characters.',
  })
  @IsString()
  unit: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Value must be greater than or equal to 0.' })
  @Max(100, { message: 'Value must be greater than or equal to 100.' })
  value: number;
}

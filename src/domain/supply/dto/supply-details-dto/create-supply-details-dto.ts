import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateSupplyDetailsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  supply_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(10, {
    message: 'Parameter is too long. Maximum length is 10 characters.',
  })
  @IsString()
  parameter: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(10, {
    message: 'Unit is too long. Maximum length is 10 characters.',
  })
  @IsString()
  unit: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Value must be greater than or equal to 0.' })
  @Max(100, { message: 'Value must be greater than or equal to 100.' })
  value: number;
}

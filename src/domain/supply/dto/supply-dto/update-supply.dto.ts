import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsInt,
  Min,
  Max,
  MaxLength,
  MinLength,
  IsNumber,
} from 'class-validator';

export class UpdateSupplyDto {
  //   @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(1990, { message: 'Year must be at least 1990.' })
  @Max(2024, { message: 'Year must be at most 2024.' })
  @Type(() => Number)
  year: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(1, { message: 'Month must be at least 1.' })
  @Max(12, { message: 'Month must be at most 12.' })
  @Type(() => Number)
  month: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(1, { message: 'Day must be at least 1.' })
  @Max(31, { message: 'Day must be at most 31.' })
  @Type(() => Number)
  day: number;

  @ApiProperty()
  @IsOptional()
  @MaxLength(50, {
    message: 'Mine is too long. Maximum length is 50 characters.',
  })
  @IsString()
  mine: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(200, {
    message: 'Source is too long. Maximum length is 200 characters.',
  })
  source: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(10, {
    message: 'Material is too long. Maximum length is 10 characters.',
  })
  @IsString()
  material: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  weight: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  density: number;

  @ApiProperty()
  @IsOptional()
  @MaxLength(20, {
    message: 'Operation is too long. Maximum length is 20 characters.',
  })
  @IsString()
  operation: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  servicesNumber: number;

  @ApiProperty()
  @IsOptional()
  @MaxLength(20, {
    message: 'Partner is too long. Maximum length is 20 characters.',
  })
  @IsString()
  partner: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(15, {
    message: 'Status is too long. Maximum length is 15 characters.',
  })
  @IsString()
  status: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(30, {
    message: 'Measure type is too long. Maximum length is 30 characters.',
  })
  @IsString()
  measureType: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(300, {
    message: 'Description is too long. Maximum length is 300 characters.',
  })
  @IsString()
  description: string;
}

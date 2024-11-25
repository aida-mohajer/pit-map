import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SupplyService } from './supply.service';
import { Supply } from 'src/domain/supply/entities/supply.entity';
import { CreateSupplyDto } from './dto/supply-dto/create-supply.dto';
import { CreateSupplyDetailsDto } from './dto/supply-details-dto/create-supply-details-dto';
import { SupplyDetails } from './entities/supply-details.entity';
import { UpdateSupplyDto } from './dto/supply-dto/update-supply.dto';

@Controller('supply')
export class SupplyController {
  constructor(private readonly supplyService: SupplyService) {}

  @Post('create')
  createSupply(@Body() createSupplyDto: CreateSupplyDto): Promise<Supply> {
    console.log('aaaaaaaaaaaaaaaaaa');
    
    return this.supplyService.createSupply(createSupplyDto);
  }

  @Post('details/create')
  createSupplyDetails(
    @Body() createSupplyDetailsDto: CreateSupplyDetailsDto,
  ): Promise<SupplyDetails> {
    return this.supplyService.createSupplyDetails(createSupplyDetailsDto);
  }

  @Get('get-all')
  getAllSupplies(): Promise<Supply[]> {
    return this.supplyService.getAllSupplies();
  }

  @Get(':supplyId')
  getSupplyById(@Param() supplyId: number): Promise<Supply> {
    return this.supplyService.getSupplyById(supplyId);
  }

  @Put(':supplyId')
  updateSupply(
    @Param() supplyId: number,
    @Body() updateSupplyDto: UpdateSupplyDto,
  ): Promise<Supply> {
    return this.supplyService.updateSupply(supplyId, updateSupplyDto);
  }

  @Delete(':supplyId')
  deleteSupply(@Param() supplyId: number): Promise<Supply> {
    return this.supplyService.deleteSupply(supplyId);
  }

  // @Get('details/create')
  // createSupplyDetails(
  //   @Body() data: CreateSupplyDetailsDto,
  // ): Promise<SupplyDetails> {
  //   return this.supplyService.createSupplyDetails(data);
  // }
}

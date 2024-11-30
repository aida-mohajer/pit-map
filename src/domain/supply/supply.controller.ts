import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { SupplyService } from './supply.service';
import { Supply } from 'src/domain/supply/entities/supply.entity';
import { CreateSupplyDto } from './dto/supply-dto/create-supply.dto';
import { CreateSupplyDetailsDto } from './dto/supply-details-dto/create-supply-details-dto';
import { SupplyDetails } from './entities/supply-details.entity';
import { UpdateSupplyDto } from './dto/supply-dto/update-supply.dto';
import { UpdateSupplyDetailsDto } from './dto/supply-details-dto/update-supply-details.dto';

@Controller('supply')
export class SupplyController {
  constructor(private readonly supplyService: SupplyService) {}

  @Post('create')
  createSupply(@Body() createSupplyDto: CreateSupplyDto): Promise<Supply> {
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

  @Get('/get/:supplyId')
  @ApiParam({
    name: 'supplyId',
    type: Number,
    required: true,
    description: 'ID of the supply',
  })
  getSupplyById(
    @Param('supplyId', new ParseIntPipe()) supplyId: number,
  ): Promise<Supply> {
    return this.supplyService.getSupplyById(supplyId);
  }

  @Get('/details/:supplyId')
  @ApiParam({
    name: 'supplyId',
    type: Number,
    required: true,
    description: 'ID of the supply',
  })
  getSupplyDetails(
    @Param('supplyId', new ParseIntPipe()) supplyId: number,
  ): Promise<SupplyDetails[]> {
    return this.supplyService.getSupplyDetails(supplyId);
  }

  @Get('/materials')
  getMaterials(): Promise<string[]> {
    return this.supplyService.getMaterials();
  }

  @Put('/update/:supplyId')
  @ApiParam({
    name: 'supplyId',
    type: Number,
    required: true,
    description: 'ID of the supply',
  })
  updateSupply(
    @Param('supplyId', ParseIntPipe) supplyId: number,
    @Body() updateSupplyDto: UpdateSupplyDto,
  ): Promise<Supply> {
    return this.supplyService.updateSupply(supplyId, updateSupplyDto);
  }

  @Put('/details/update/:supplyDetailsId')
  @ApiParam({
    name: 'supplyDetailsId',
    type: Number,
    required: true,
    description: 'ID of the supplyDetails',
  })
  updateSupplyDetails(
    @Param('supplyDetailsId', ParseIntPipe) supplyDetailsId: number,
    @Body() updateSupplyDetailsDto: UpdateSupplyDetailsDto,
  ): Promise<SupplyDetails> {
    return this.supplyService.updateSupplyDetails(
      supplyDetailsId,
      updateSupplyDetailsDto,
    );
  }

  @Delete('/delete/:supplyId')
  @ApiParam({
    name: 'supplyId',
    type: Number,
    required: true,
    description: 'ID of the supply',
  })
  deleteSupply(
    @Param('supplyId', ParseIntPipe) supplyId: number,
  ): Promise<Supply> {
    return this.supplyService.deleteSupply(supplyId);
  }

  @Delete('/details/delete/:supplyDetailsId')
  @ApiParam({
    name: 'supplyDetailsId',
    type: Number,
    required: true,
    description: 'ID of the supplyDetails',
  })
  deleteSupplyDetails(
    @Param('supplyDetailsId', ParseIntPipe) supplyDetailsId: number,
  ): Promise<SupplyDetails> {
    return this.supplyService.deleteSupplyDetails(supplyDetailsId);
  }
}

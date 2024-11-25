import { Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplyRepository } from './repositories/supply.repository';
import { CreateSupplyDto } from './dto/supply-dto/create-supply.dto';
import { Supply } from './entities/supply.entity';
import { CreateSupplyDetailsDto } from './dto/supply-details-dto/create-supply-details-dto';
import { SupplyDetailsRepository } from './repositories/supply-details.repository';
import { SupplyDetails } from './entities/supply-details.entity';
import { UpdateSupplyDto } from './dto/supply-dto/update-supply.dto';

@Injectable()
export class SupplyService {
  constructor(
    @InjectRepository(SupplyRepository)
    private readonly supplyRepo: SupplyRepository,
    @InjectRepository(SupplyDetailsRepository)
    private readonly supplyDetailRepo: SupplyDetailsRepository,

    // @InjectMapper() private readonly mapper: Mapper,
  ) {}
  async createSupply(createSupplyDto: CreateSupplyDto): Promise<Supply> {
    return await this.supplyRepo.createSupply(createSupplyDto);
  }

  async createSupplyDetails(
    createSupplyDetailsDto: CreateSupplyDetailsDto
  ): Promise<SupplyDetails> {
    
    const supply = await this.supplyRepo.findOne({
      where: { id: createSupplyDetailsDto.supply_id },
      relations: ['supplyDetails', 'supply'],
    });

    return await this.supplyDetailRepo.createSupplyDetails(
      createSupplyDetailsDto,
      supply,
    );
  }

  async getAllSupplies(): Promise<Supply[]> {
    return await this.supplyRepo.getAllSupplies();
  }

  async getSupplyById(supplyId: number): Promise<Supply> {
    return await this.supplyRepo.getSupplyById(supplyId);
  }

  async getSupplyDetails(id: number): Promise<SupplyDetails[]> {
    const supply = await this.supplyRepo.findOne({
      where: { id: id },
      relations: ['supplyDetails', 'supply'],
    });

    return await this.supplyDetailRepo.getSupplyDetails(id, supply);
  }

  async updateSupply(supplyId:number , updateSupplydto:UpdateSupplyDto):Promise<Supply>{
    return await this.supplyRepo.updateSupply(supplyId,updateSupplydto)
  }

  async deleteSupply(supplyId:number):Promise<Supply>{
    return await this.supplyRepo.deleteSupply(supplyId)
  }
}

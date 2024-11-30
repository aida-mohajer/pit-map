import { Injectable, NotFoundException } from '@nestjs/common';
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
import { UpdateSupplyDetailsDto } from './dto/supply-details-dto/update-supply-details.dto';

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
    console.log(createSupplyDto);
    return await this.supplyRepo.createSupply(createSupplyDto);
  }

  async createSupplyDetails(
    createSupplyDetailsDto: CreateSupplyDetailsDto,
  ): Promise<SupplyDetails> {
    const supply = await this.supplyRepo.findOne({
      where: { id: createSupplyDetailsDto.supply_id },
      relations: ['supply_details'],
    });

    if (!supply) {
      throw new NotFoundException('Supply not found');
    }

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

  async getSupplyDetails(supplyId: number): Promise<SupplyDetails[]> {
    if (!supplyId) {
      throw new NotFoundException(`Supply with ID ${supplyId} not found`);
    }
    const supplyDetails = await this.supplyDetailRepo.find({
      where: { supply: { id: supplyId } },
    });
    console.log('Supply Details Retrieved:', supplyDetails);

    if (supplyDetails.length === 0) {
      throw new NotFoundException(
        `No details found for Supply with ID ${supplyId}`,
      );
    }

    return supplyDetails;
  }

  async updateSupply(
    supplyId: number,
    updateSupplydto: UpdateSupplyDto,
  ): Promise<Supply> {
    return await this.supplyRepo.updateSupply(supplyId, updateSupplydto);
  }

  async updateSupplyDetails(
    supplyDetailsId: number,
    updateSupplyDetailsDto: UpdateSupplyDetailsDto,
  ): Promise<SupplyDetails> {
    return await this.supplyDetailRepo.updateSupplyDetail(
      supplyDetailsId,
      updateSupplyDetailsDto,
    );
  }

  async deleteSupply(supplyId: number): Promise<Supply> {
    return await this.supplyRepo.deleteSupply(supplyId);
  }

  async deleteSupplyDetails(supplyDetailsId: number): Promise<SupplyDetails> {
    return await this.supplyDetailRepo.deleteSupplyDetails(supplyDetailsId);
  }

  async getMaterials(): Promise<string[]> {
    return await this.supplyRepo.getMaterials();
  }
}

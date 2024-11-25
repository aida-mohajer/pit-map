import { Repository } from 'typeorm';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupplyDetails } from '../entities/supply-details.entity';
import { CreateSupplyDetailsDto } from '../dto/supply-details-dto/create-supply-details-dto';
import { UpdateSupplyDetailsDto } from '../dto/supply-details-dto/update-supply-details.dto';
import { Supply } from '../entities/supply.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplyRepository } from './supply.repository';

@Injectable()
export class SupplyDetailsRepository extends Repository<SupplyDetails> {

  async createSupplyDetails(
    createSupplyDetailsDto: CreateSupplyDetailsDto, supply:Supply
  ): Promise<SupplyDetails> {
    try {
      const supplyDetails = new SupplyDetails();
      
      Object.assign(supplyDetails, createSupplyDetailsDto);
      supplyDetails.supply = supply;

      await this.save(supplyDetails);
      return supplyDetails;
    } catch (error) {
      console.error('Error creating supply details:', error);
      throw new InternalServerErrorException('Could not create supply details');
    }
  }

  async getSupplyDetails(supplyId: number, supply:Supply): Promise<SupplyDetails[]> {
    try {
      
      if (!supplyId) {
        throw new NotFoundException(`Supply with ID ${supplyId} not found`);
      }

      if (!supply.supplyDetails || supply.supplyDetails.length === 0) {
        throw new NotFoundException(`No details found for Supply with ID ${supplyId}`);
      }
      return supply.supplyDetails
       
    } catch (error) {
      console.error('Error getting supply details:', error);
      throw new InternalServerErrorException('Could not get supply details');
    }
  }

  async updateSupplyDetail(
    supplyId: number,
    updateSupplyDetailsDto: UpdateSupplyDetailsDto,
  ): Promise<SupplyDetails> {
    try {
      const supplyDetails = await this.findOne({ where: { id: supplyId } });
      Object.assign(supplyDetails, updateSupplyDetailsDto);
      await this.save(supplyDetails);
      return supplyDetails;
    } catch (error) {
      console.error('Error updating supply details:', error);
      throw new InternalServerErrorException('Could not update supply details');
    }
  }

  async deleteSupplyDetail(id: number): Promise<SupplyDetails> {
    try {
      const supplyDetails = await this.findOne({ where: { id: id } });
      await this.remove(supplyDetails);
      return supplyDetails;
    } catch (error) {
      console.error('Error removing supply detail:', error);
      throw new InternalServerErrorException('Could not remove supply detail');
    }
  }
}

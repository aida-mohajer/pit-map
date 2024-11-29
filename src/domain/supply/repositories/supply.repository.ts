import { DataSource, EntityRepository, Repository } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Supply } from 'src/domain/supply/entities/supply.entity';
import { CreateSupplyDto } from '../dto/supply-dto/create-supply.dto';
import { UpdateSupplyDto } from '../dto/supply-dto/update-supply.dto';

// @Injectable()
export class SupplyRepository extends Repository<Supply> {
  constructor(private dataSource: DataSource) {
    super(Supply, dataSource.manager);
  }
  async createSupply(createSupplyDto: CreateSupplyDto): Promise<Supply> {
    try {
      const supply = new Supply();
      Object.assign(supply, createSupplyDto);
      await this.save(supply);
      return supply;
    } catch (error) {
      console.error('Error creating supply:', error);
      throw new InternalServerErrorException('Could not create supply');
    }
  }

  async getAllSupplies(): Promise<Supply[]> {
    try {
      return await this.find();
    } catch (error) {
      console.error('Error getting supplies:', error);
      throw new InternalServerErrorException('Could not get supplies');
    }
  }

  async getSupplyById(supplyId: number): Promise<Supply> {
    try {
      const supply = await this.findOne({ where: { id: supplyId } });
      if (!supply) {
        throw new NotFoundException(`Supply with ID ${supplyId} not found`);
      }
      return supply;
    } catch (error) {
      console.error('Error getting supply:', error);
      throw new InternalServerErrorException('Could not get supply');
    }
  }

  async updateSupply(
    supplyId: number,
    updateSupplyDto: UpdateSupplyDto,
  ): Promise<Supply> {
    try {
      const supply = await this.findOne({ where: { id: supplyId } });

      if (!supply) {
        throw new NotFoundException(`Supply with ID ${supplyId} not found`);
      }

      Object.assign(supply, updateSupplyDto);
      await this.save(supply);
      return supply;
    } catch (error) {
      console.error('Error updating supply:', error);
      throw new InternalServerErrorException('Could not update supply');
    }
  }

  async deleteSupply(supplyId: number): Promise<Supply> {
    try {
      const supply = await this.findOne({ where: { id: supplyId } });

      if (!supply) {
        throw new NotFoundException(`Supply with ID ${supplyId} not found`);
      }

      await this.remove(supply);
      return supply;
    } catch (error) {
      console.error('Error removing supply:', error);
      throw new InternalServerErrorException('Could not remove supply');
    }
  }
}

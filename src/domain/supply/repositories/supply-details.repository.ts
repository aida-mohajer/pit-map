import { DataSource, Repository } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupplyDetails } from '../entities/supply-details.entity';
import { CreateSupplyDetailsDto } from '../dto/supply-details-dto/create-supply-details-dto';
import { UpdateSupplyDetailsDto } from '../dto/supply-details-dto/update-supply-details.dto';
import { Supply } from '../entities/supply.entity';

@Injectable()
export class SupplyDetailsRepository extends Repository<SupplyDetails> {
  constructor(private dataSource: DataSource) {
    super(SupplyDetails, dataSource.manager);
  }
  async createSupplyDetails(
    createSupplyDetailsDto: CreateSupplyDetailsDto,
    supply: Supply,
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

  async updateSupplyDetail(
    supplyDetailsId: number,
    updateSupplyDetailsDto: UpdateSupplyDetailsDto,
  ): Promise<SupplyDetails> {
    try {
      const supplyDetails = await this.findOne({
        where: { id: supplyDetailsId },
      });
      if (!supplyDetails) {
        throw new NotFoundException(
          `Supply details with ID ${supplyDetails} not found`,
        );
      }
      Object.assign(supplyDetails, updateSupplyDetailsDto);
      await this.save(supplyDetails);
      return supplyDetails;
    } catch (error) {
      console.error('Error updating supply details:', error);
      throw new InternalServerErrorException('Could not update supply details');
    }
  }

  async deleteSupplyDetails(supplyDetailId: number): Promise<SupplyDetails> {
    try {
      const supplyDetails = await this.findOne({
        where: { id: supplyDetailId },
      });
      if (!supplyDetails) {
        throw new NotFoundException(
          `Supply details with ID ${supplyDetailId} not found`,
        );
      }
      await this.remove(supplyDetails);
      return supplyDetails;
    } catch (error) {
      console.error('Error removing supply detail:', error);
      throw new InternalServerErrorException('Could not remove supply detail');
    }
  }
}

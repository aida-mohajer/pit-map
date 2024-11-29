import { AutoMap } from '@automapper/classes';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Supply } from './supply.entity';

@Entity()
export class SupplyDetails {
  // @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  parameter: string;

  @Column({ length: 10 })
  unit: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  value: number;

  @ManyToOne(() => Supply, (supply) => supply.supply_details, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'supply_id' })
  supply: Supply;
}

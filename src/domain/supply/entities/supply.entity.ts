import { AutoMap } from '@automapper/classes';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { SupplyDetails } from './supply-details.entity';

@Entity({name:'supply'})
export class Supply extends BaseEntity {
  // @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  year: number;

  @Column({ type: 'integer' })
  month: number;

  @Column({ type: 'integer' })
  day: number;

  @Column({  length: 50 })
  mine: string;

  @Column({  length: 10 })
  material: string;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  weight: number;

  @Column({nullable:true})
  source: string;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  density: number;

  @Column({  length: 20 })
  operation: string;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  service_number: number;

  @Column({  length: 20 })
  partner: string;

  @Column({  length: 15 })
  status: string;

  @Column({  length: 30 })
  measure_type: string;

  @Column({ nullable:true, length: 300 })
  description: string;

  // @CreateDateColumn()
  // createdAt: Date;

  // @UpdateDateColumn()
  // updatedAt: Date;

  @OneToMany(()=> SupplyDetails , (supplyDetails) => supplyDetails.supply)
  supplyDetails:SupplyDetails[]
}

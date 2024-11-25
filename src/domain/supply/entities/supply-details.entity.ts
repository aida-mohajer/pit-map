import { AutoMap } from '@automapper/classes';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Supply } from './supply.entity';

@Entity()
export class SupplyDetails {
  // @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10 })
  parameter: string;

  @Column({ type: 'varchar', length: 10 })
  unit: string;

  @Column({ type: 'decimal' , precision: 5, scale: 2 })
  value: number;

  @ManyToOne(()=> Supply , (supply) => supply.supplyDetails , {onDelete:'CASCADE'})
  @JoinColumn({name:'supplyId'})
  supply:Supply
}

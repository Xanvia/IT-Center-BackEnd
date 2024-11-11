import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany } from 'typeorm';
import { ReserveRecord } from 'src/reserve-records/entities/reserve-record.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('simple-array')
  images: string[];

  @Column()
  seatLimit: number;

  @Column({ nullable: true })
  noOfComputers?: number;

  @Column({ nullable: true })
  availableSoftwares?: string;

  @Column()
  Equipment: string;

  @Column()
  isAC: boolean;

  @Column()
  specialities: string;

  @Column()
  location: string;

  @Column('decimal')
  feeRatePerHour: number;

  @OneToMany(() => ReserveRecord, (record) => record.reservation)
  records: ReserveRecord[];
}

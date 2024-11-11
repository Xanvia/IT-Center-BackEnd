import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ReservedDate } from './reserved-date.entity';
import { OneToMany } from 'typeorm';

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

  @Column()
  noOfComputers: number;

  @Column()
  availableSoftwares: string;

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

  @OneToMany(() => ReservedDate, (reservedDate) => reservedDate.reservation)
  reservedDates: ReservedDate[];
}

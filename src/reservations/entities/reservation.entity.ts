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
  machineDetails: string;

  @Column()
  isAC: boolean;

  @Column()
  specialities: string;

  @Column('decimal')
  fees: number;

  @OneToMany(() => ReservedDate, (reservedDate) => reservedDate.reservation)
  reservedDates: ReservedDate[];
}

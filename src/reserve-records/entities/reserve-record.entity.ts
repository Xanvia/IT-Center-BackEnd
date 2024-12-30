import { ReservationStatus, TimeSlot } from 'enums/reservation.enum';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';

@Entity()
@Index(['startingDate', 'timeSlot'], { unique: true })
export class ReserveRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  eventName: string;

  @Column({ type: 'date' })
  startingDate: string;

  @Column({ type: 'date' })
  endingDate: string;

  @Column({ type: 'enum', enum: TimeSlot, default: TimeSlot.MORNING })
  timeSlot: TimeSlot;

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  status: ReservationStatus;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @ManyToOne(() => Reservation, (reservation) => reservation.records, {
    onDelete: 'SET NULL',
  })
  reservation: Reservation;

  @ManyToOne(() => User, (user) => user.reserveRecords, {
    onDelete: 'SET NULL',
  })
  user: User;
}

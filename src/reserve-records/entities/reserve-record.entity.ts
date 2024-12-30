import { ReservationStatus, TimeSlot } from 'enums/reservation.enum';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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

  @ManyToOne(() => Reservation, (reservation) => reservation.records, {
    onDelete: 'SET NULL',
  })
  reservation: Reservation;

  @ManyToOne(() => User, (user) => user.reserveRecords, {
    onDelete: 'SET NULL',
  })
  user: User;
}

// need to add payment record

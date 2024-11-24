import { Reservation } from 'src/reservations/entities/reservation.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ReservationStatus } from 'types/reservation.type';

@Entity()
export class ReserveRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  eventName: string;

  @Column({ type: 'date' })
  date: string;

  @Column()
  isFullDay: boolean;

  @Column()
  noOfDays: number;

  @Column()
  status: ReservationStatus;

  @ManyToOne(() => Reservation, (reservation) => reservation.records)
  reservation: Reservation;

  @ManyToOne(() => User, (user) => user.reserveRecords)
  user: User;
}

// need to add payment record

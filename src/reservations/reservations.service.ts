import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepo: Repository<Reservation>,
  ) {}

  async create(createReservationDto: CreateReservationDto) {
    const reservation = this.reservationRepo.create({
      ...createReservationDto,
    });
    return await this.reservationRepo.save(reservation);
  }

  async findAll(): Promise<Reservation[]> {
    return await this.reservationRepo.find();
  }

  async findOne(id: string): Promise<Reservation> {
    const reservation = await this.reservationRepo.findOneBy({ id });
    if (!reservation) {
      throw new NotFoundException(`Reservation with id ${id} not found!`);
    }
    return reservation;
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    const updateData = { ...updateReservationDto };
    return await this.reservationRepo.update(id, updateData);
  }

  async remove(id: string): Promise<void> {
    const result = await this.reservationRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Reservation with id ${id} not found!`);
    }
  }
}

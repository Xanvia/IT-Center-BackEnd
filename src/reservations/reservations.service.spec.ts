import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from './reservations.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';

const mockReservation = {
  id: '1',
  name: 'Test Reservation',
  description: 'Test Description',
  images: ['image1.jpg', 'image2.jpg'],
  seatLimit: 10,
  noOfComputers: 5,
  availableSoftwares: 'Software1, Software2',
  Equipment: 'Projector',
  isAC: true,
  specialities: 'Speciality1',
  location: 'Test Location',
  feeRatePerHour: 100.0,
  reservedDates: [],
};

const mockReservationRepository = {
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn().mockResolvedValue(mockReservation),
  find: jest.fn().mockResolvedValue([mockReservation]),
  findOneBy: jest.fn().mockResolvedValue(mockReservation),
  update: jest.fn().mockResolvedValue(mockReservation),
  delete: jest.fn().mockResolvedValue({ affected: 1 }),
};

describe('ReservationsService', () => {
  let service: ReservationsService;
  let repository: Repository<Reservation>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: getRepositoryToken(Reservation),
          useValue: mockReservationRepository,
        },
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
    repository = module.get<Repository<Reservation>>(
      getRepositoryToken(Reservation),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a reservation', async () => {
    const createReservationDto: CreateReservationDto = {
      name: 'Test Reservation',
      description: 'Test Description',
      images: ['image1.jpg', 'image2.jpg'],
      seatLimit: 10,
      noOfComputers: 5,
      availableSoftwares: 'Software1, Software2',
      Equipment: 'Projector',
      isAC: true,
      specialities: 'Speciality1',
      location: 'Test Location',
      feeRatePerHour: 100.0,
    };
    expect(await service.create(createReservationDto)).toEqual(mockReservation);
    expect(repository.create).toHaveBeenCalledWith(createReservationDto);
    expect(repository.save).toHaveBeenCalledWith(createReservationDto);
  });

  it('should return all reservations', async () => {
    expect(await service.findAll()).toEqual([mockReservation]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return a reservation by id', async () => {
    expect(await service.findOne('1')).toEqual(mockReservation);
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: '1' });
  });

  it('should throw an error if reservation not found', async () => {
    jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);
    await expect(service.findOne('2')).rejects.toThrow(NotFoundException);
  });

  it('should update a reservation', async () => {
    const updateReservationDto = {
      name: 'Updated Reservation',
      date: new Date(),
    };
    expect(await service.update('1', updateReservationDto)).toEqual(
      mockReservation,
    );
    expect(repository.update).toHaveBeenCalledWith('1', updateReservationDto);
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: '1' });
  });

  it('should throw an error if updated reservation not found', async () => {
    jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);
    const updateReservationDto = {
      name: 'Updated Reservation',
      date: new Date(),
    };
    await expect(service.update('2', updateReservationDto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should delete a reservation', async () => {
    expect(await service.remove(1)).toBeUndefined();
    expect(repository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw an error if reservation to delete not found', async () => {
    jest
      .spyOn(repository, 'delete')
      .mockResolvedValueOnce({ affected: 0, raw: {} });
    await expect(service.remove(2)).rejects.toThrow(NotFoundException);
  });
});

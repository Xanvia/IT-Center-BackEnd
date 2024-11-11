import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';

describe('ReservationsController', () => {
  let controller: ReservationsController;
  let service: ReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationsController],
      providers: [
        {
          provide: ReservationsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ReservationsController>(ReservationsController);
    service = module.get<ReservationsService>(ReservationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a reservation', async () => {
      const createReservationDto: CreateReservationDto = {
        name: 'Test Reservation',
        description: 'Test Description',
        images: ['image1.jpg'],
        seatLimit: 10,
        noOfComputers: 5,
        availableSoftwares: 'Software1, Software2',
        Equipment: 'Projector',
        isAC: true,
        specialities: 'Speciality1',
        location: 'Location1',
        feeRatePerHour: 100.0,
      };
      const result = new Reservation();
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createReservationDto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of reservations', async () => {
      const result = [new Reservation()];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single reservation', async () => {
      const result = new Reservation();
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a reservation', async () => {
      const updateReservationDto: UpdateReservationDto = {
        name: 'Updated Reservation',
      };
      const result = new Reservation();
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update('1', updateReservationDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a reservation', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue();

      expect(await controller.remove('1')).toBeUndefined();
    });
  });
});

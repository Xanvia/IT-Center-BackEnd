import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepo.create(createUserDto);
    return await this.userRepo.save(user);
  }

  async findOne(id: string): Promise<User | undefined> {
    return await this.userRepo.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepo.findOne({ where: { email } });
  }

  async updateHashedRefreshToken(userId: string, hashedRefreshToken: string) {
    return await this.userRepo.update({ id: userId }, { hashedRefreshToken });
  }
}

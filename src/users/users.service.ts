import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { Role } from 'enums/role.enum';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  // will be used in auth service to create user
  // here the existance will not be checked
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepo.create(createUserDto);
    return await this.userRepo.save(user);
  }

  // find user with the id
  async findOne(id: string): Promise<User | undefined> {
    return await this.userRepo.findOne({ where: { id } });
  }

  // find user by the email
  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepo.findOne({ where: { email } });
  }

  // will be used in auth service to update user's refresh token
  async updateHashedRefreshToken(userId: string, hashedRefreshToken: string) {
    return await this.userRepo.update({ id: userId }, { hashedRefreshToken });
  }

  // delete user
  async deleteUser(id: string): Promise<DeleteResult> {
    return await this.userRepo.delete(id);
  }

  // Update a user's role with validation for allowed transitions
  async updateUserRole(userId: string, newRole: Role): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Define allowed role transitions
    const allowedTransitions: { [key in Role]: Role[] } = {
      [Role.R_USER]: [Role.STUDENT, Role.STAFF],
      [Role.STUDENT]: [],
      [Role.STAFF]: [Role.ADMIN, Role.S_ADMIN],
      [Role.ADMIN]: [Role.S_ADMIN, Role.STAFF],
      [Role.S_ADMIN]: [],
    };

    // Check if the new role is allowed for the current role
    if (!allowedTransitions[user.role].includes(newRole)) {
      throw new BadRequestException(
        `Invalid role transition from ${user.role} to ${newRole}`,
      );
    }

    // Update the role and save the user
    user.role = newRole;
    return await this.userRepo.save(user);
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { Role } from 'enums/role.enum';
import { hashPassword } from 'utils/hashPassword';
import { Admin } from './entities/admin.entity';
import { StaffProfile } from 'src/profile/staff-profile/entities/StaffProfile.entity';
import { StudentProfile } from 'src/profile/student-profile/entities/studentProfile.entity';
import { Student } from './entities/student.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    @InjectRepository(Admin) private studentRepo: Repository<Student>,
    @InjectRepository(StaffProfile)
    private staffProfileRepo: Repository<StaffProfile>,
  ) {}

  // will be used in auth service to create user
  // here the existance will not be checked
  async createUser(createUserDto: CreateUserDto) {
    createUserDto.hashedPassword = await hashPassword(
      createUserDto.hashedPassword,
    );
    const user = this.userRepo.create(createUserDto);
    console.log(user);
    try {
      const newUser = await this.userRepo.save(user);
      const { hashedPassword, hashedRefreshToken, ...sanitizedUser } = newUser;
      return sanitizedUser;
    } catch (error) {
      console.log(error);
    }
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
  async updateUsertoStudent(
    userId: string,
    profile: StudentProfile,
  ): Promise<Student> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const { id, createdDate, role, ...data } = user;
    const student = this.studentRepo.create(data);
    student.profile = profile;

    return await this.studentRepo.save(student);
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { Role } from 'enums/role.enum';
import { hashPassword } from 'utils/hashPassword';
import { Admin } from './entities/admin.entity';
import { Student } from './entities/student.entity';
import { CreateStudentProfileDto } from 'src/profile/student-profile/dto/create-student-profile.dto';
import { StudentProfileService } from 'src/profile/student-profile/student-profile.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    private studentProfileService: StudentProfileService,
  ) {}

  // will be used in auth service to create user
  async createUser(createUserDto: CreateUserDto) {
    createUserDto.hashedPassword = await hashPassword(
      createUserDto.hashedPassword,
    );
    const user = this.userRepo.create(createUserDto);
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

  // find all users
  async getUsers(): Promise<User[]> {
    return await this.userRepo.find();
  }

  // find all students
  async getStudents(): Promise<Student[]> {
    return await this.studentRepo.find();
  }

  // find all admins
  async getAdmins(): Promise<Admin[]> {
    return await this.adminRepo.find();
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
    profile: CreateStudentProfileDto,
  ): Promise<Student> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const { id, createdDate, role, ...data } = user;
    const student = this.studentRepo.create(data);
    profile.displayName = data.name;
    const profileData = await this.studentProfileService.create(profile);
    student.profile = profileData;

    return await this.studentRepo.save(student);
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { Role } from 'enums/role.enum';
import { hashPassword } from 'utils/hashPassword';
import { Admin } from './entities/admin.entity';
import { Student } from './entities/student.entity';
import { CreateStudentProfileDto } from 'src/profile/student-profile/dto/create-student-profile.dto';
import { StudentProfileService } from 'src/profile/student-profile/student-profile.service';
import { Staff } from './entities/staff.entity';
import { SuperAdmin } from './entities/superAdmin.entity';
import { StaffProfileService } from 'src/profile/staff-profile/staff-profile.service';
import { compare } from 'bcrypt';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    @InjectRepository(SuperAdmin) private sAdminRepo: Repository<SuperAdmin>,
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    @InjectRepository(Staff) private staffRepo: Repository<Staff>,
    @InjectDataSource() private dataSource: DataSource,

    private studentProfileService: StudentProfileService,
    private staffProfileService: StaffProfileService,
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

  // find user by the email
  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepo.findOne({ where: { email } });
  }

  // find all users
  async getUsers(): Promise<User[]> {
    return await this.userRepo.find();
  }

  // find all students
  async getStudents(): Promise<Student[]> {
    return await this.studentRepo.find();
  }

  // find all staff
  async getStaff(): Promise<User[]> {
    return await this.staffRepo.find({
      relations: ['staffProfile'],
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        staffProfile: {
          id: true,
          designation: true,
          extNo: true,
          title: true,
        },
      },
    });
  }

  // find all admins
  async getAdmins(): Promise<Admin[]> {
    return await this.adminRepo.find();
  }

  // find student by the id
  async getMyStudentInfo(userId: string): Promise<Student | undefined> {
    // get student data with limited profile data
    const student = await this.studentRepo.findOne({
      where: { id: userId },
      relations: { studentProfile: true },
    });
    delete student.hashedPassword;
    delete student.hashedRefreshToken;
    return student;
  }

  // will be used in auth service to update user's refresh token
  async updateHashedRefreshToken(userId: string, hashedRefreshToken: string) {
    return await this.userRepo.update({ id: userId }, { hashedRefreshToken });
  }

  // delete user
  async deleteUser(id: string): Promise<DeleteResult> {
    return await this.userRepo.delete(id);
  }

  // Update a user to student
  async updateUsertoStudent(userId: string, profile: CreateStudentProfileDto) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    try {
      const { id, createdDate, role, ...data } = user;
      const student = this.studentRepo.create(data);
      student.studentId = await Student.getNextStudentId(this.dataSource);

      profile.displayName = data.name;
      const profileData = await this.studentProfileService.create(profile);
      student.studentProfile = profileData;

      // delete the previos
      await this.userRepo.delete({ id: userId });

      const newOne = await this.studentRepo.save(student);

      if (!newOne) {
        const user = this.userRepo.create(data);
        await this.userRepo.save(user);
        throw new BadRequestException('Failed to update user to Student');
      }
    } catch (error) {
      throw new BadRequestException(
        'Failed to update user to student',
        error.message,
      );
    }
  }

  // Update a user profile image
  async updateProfileImage(userId: string, imageUrl: string) {
    return await this.userRepo.update({ id: userId }, { image: imageUrl });
  }

  // change user passowrd
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    // check previous password is correct
    const user = await this.findOne(userId);
    if (!user) throw new NotFoundException('User not found');
    const isPasswordMatch = await compare(currentPassword, user.hashedPassword);

    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid password');
    }

    const hashedPassword = await hashPassword(newPassword);
    user.hashedPassword = hashedPassword;
    return await this.userRepo.save(user);
  }

  // update user profile
  async updateProfile(userId: string, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update({ id: userId }, updateUserDto);
  }

  // Update a user to Staff
  async updateUsertoStaff(userEmail: string) {
    const user = await this.userRepo.findOne({ where: { email: userEmail } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const profile = await this.staffProfileService.findByEmail(userEmail);
    if (!profile) {
      throw new BadRequestException('Profile not found');
    }

    try {
      const { id, createdDate, role, ...data } = user;
      const staff = this.staffRepo.create(data);
      profile.isApproved = true;
      staff.staffProfile = profile;

      // delete the previos
      await this.userRepo.delete({ email: userEmail });

      // create new staff
      const newOne = await this.staffRepo.save(staff);

      if (!newOne) {
        const user = this.userRepo.create(data);
        await this.userRepo.save(user);
        throw new BadRequestException('Failed to update user to staff');
      }
    } catch (error) {
      throw new BadRequestException(
        'Failed to update user to staff',
        error.message,
      );
    }
  }

  // Update a staff to Admin
  async updateStafftoAdmin(id: string) {
    if (!id) {
      throw new BadRequestException('User not found');
    }
    const user = await this.staffRepo.findOne({
      where: { id },
      relations: ['staffProfile'],
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    try {
      const { id, createdDate, role, ...data } = user;
      const admin = this.adminRepo.create(data);

      // delete the previos
      await this.staffRepo.delete({ id });

      // create new admin
      const newOne = await this.adminRepo.save(admin);

      if (!newOne) {
        const user = this.staffRepo.create(data);
        await this.staffRepo.save(user);
        throw new BadRequestException('Failed to update staff to admin');
      }
    } catch (error) {
      throw new BadRequestException(
        'Failed to update staff to admin',
        error.message,
      );
    }
  }

  // Update a admin to Super Admin
  async updateAdmintoSuperAdmin(id: string) {
    if (!id) {
      throw new BadRequestException('User not found');
    }
    const user = await this.adminRepo.findOne({
      where: { id },
      relations: ['staffProfile'],
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    try {
      const { id, createdDate, role, ...data } = user;
      const sAdmin = this.sAdminRepo.create(data);

      // delete the previos
      await this.adminRepo.delete({ id });

      // create new super admin
      const newOne = await this.sAdminRepo.save(sAdmin);

      if (!newOne) {
        const user = this.adminRepo.create(data);
        await this.adminRepo.save(user);
        throw new BadRequestException('Failed to update admin to super admin');
      }
    } catch (error) {
      throw new BadRequestException(
        'Failed to update admin to super admin',
        error.message,
      );
    }
  }

  // Update Admin to Staff
  async updateAdmintoStaff(id: string) {
    const user = await this.adminRepo.findOne({
      where: { id },
      relations: ['staffProfile'],
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    try {
      const { id, createdDate, role, ...data } = user;
      const staff = this.staffRepo.create(data);

      // delete the previos
      await this.adminRepo.delete({ id });

      // create new staff
      const newOne = await this.staffRepo.save(staff);

      if (!newOne) {
        const user = this.adminRepo.create(data);
        await this.adminRepo.save(user);
        throw new BadRequestException('Failed to update admin to staff');
      }
    } catch (error) {
      throw new BadRequestException(
        'Failed to update admin to staff',
        error.message,
      );
    }
  }

  // delete staff
  async deleteStaff(id: string): Promise<DeleteResult> {
    return await this.staffRepo.delete(id);
  }

  // delete an account
  async deleteAccount(userId: string): Promise<DeleteResult> {
    return await this.userRepo.delete(userId);
  }
}

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentProfileDto } from './dto/create-student-profile.dto';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';
import { StudentProfile } from './entities/studentProfile.entity';
import { HigherEdu } from './entities/higherEdu.entity';
import { Employment } from './entities/employment.entity';
import { Education } from './entities/education.entity';
import { ALResult } from './entities/alResult.entity';

@Injectable()
export class StudentProfileService {
  constructor(
    @InjectRepository(StudentProfile)
    private studentProfileRepository: Repository<StudentProfile>,

    @InjectRepository(HigherEdu)
    private higherEduRepository: Repository<HigherEdu>,

    @InjectRepository(Employment)
    private employmentRepository: Repository<Employment>,

    @InjectRepository(Education)
    private educationRepository: Repository<Education>,

    @InjectRepository(ALResult)
    private alRepo: Repository<ALResult>,
  ) {}

  // Create a new student profile with all nested entities
  async create(
    createStudentProfileDto: CreateStudentProfileDto,
  ): Promise<StudentProfile> {
    const {
      title,
      displayName,
      fullName,
      nameWithIntials,
      dateOfBirth,
      nationalIdCardNo,
      address,
      phoneNumber,
      otherQualification,
      education,
      higherEdu,
      employment,
    } = createStudentProfileDto;

    // Create student profile
    const studentProfile = this.studentProfileRepository.create({
      title,
      displayName,
      fullName,
      nameWithIntials,
      dateOfBirth,
      nationalIdCardNo,
      address,
      phoneNumber,
      otherQualification,
    });

    // Create Education
    const { aLevelResults, ...rest } = education;
    const edu = this.educationRepository.create(rest);
    edu.aLevelResults = aLevelResults.map((al) => this.alRepo.create(al));

    studentProfile.education = await this.educationRepository.save(edu);
    // Create Higher Education (if any)
    studentProfile.higherEdu = higherEdu.map((edu) =>
      this.higherEduRepository.create(edu),
    );

    // Create Employment (if any)
    studentProfile.employment = this.employmentRepository.create(employment);

    // Save student profile with all relations
    try {
      return await this.studentProfileRepository.save(studentProfile);
    } catch (error) {
      throw new ConflictException(
        `Error creating student profile: ${error.message}`,
      );
    }
  }

  // Get all student profiles
  async findAll(): Promise<StudentProfile[]> {
    return this.studentProfileRepository.find({
      relations: ['education', 'higherEdu', 'employment'], // Include relations
    });
  }

  // Get a single student profile by ID
  async findOne(id: string): Promise<StudentProfile> {
    const studentProfile = await this.studentProfileRepository.findOne({
      where: { id },
      relations: ['education', 'higherEdu', 'employment'], // Include relations
    });
    if (!studentProfile) {
      throw new NotFoundException(`StudentProfile with ID ${id} not found`);
    }
    return studentProfile;
  }

  // Update an existing student profile by ID
  async update(
    id: string,
    updateStudentProfileDto: UpdateStudentProfileDto,
  ): Promise<StudentProfile> {
    const studentProfile = await this.findOne(id);

    // Update main student profile fields
    Object.assign(studentProfile, updateStudentProfileDto);

    // Update Education
    if (updateStudentProfileDto.education) {
      const educationEntity = this.educationRepository.create(
        updateStudentProfileDto.education,
      );
      studentProfile.education =
        await this.educationRepository.save(educationEntity);
    }

    // Update Higher Education
    if (updateStudentProfileDto.higherEdu) {
      const higherEduEntities = await Promise.all(
        updateStudentProfileDto.higherEdu.map((edu) =>
          this.higherEduRepository.create(edu),
        ),
      );
      studentProfile.higherEdu =
        await this.higherEduRepository.save(higherEduEntities);
    }

    // Update Employment
    if (updateStudentProfileDto.employment) {
      const employmentEntity = this.employmentRepository.create(
        updateStudentProfileDto.employment,
      );
      studentProfile.employment =
        await this.employmentRepository.save(employmentEntity);
    }

    // Save updated profile
    return this.studentProfileRepository.save(studentProfile);
  }

  // Delete a student profile by ID
  async remove(id: string): Promise<void> {
    const result = await this.studentProfileRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`StudentProfile with ID ${id} not found`);
    }
  }

  // Check if a student profile exists by ID (can be used in create or update)
  async exists(id: string): Promise<boolean> {
    const profile = await this.studentProfileRepository.findOne({
      where: { id },
    });
    return !!profile;
  }
}

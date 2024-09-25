import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffProfile } from './entities/profile.entity';
import { CreateStaffProfileDto } from './dto/create-staff-profile.dto';
import { Email } from './entities/email.entity';
import { Telephone } from './entities/telephone.entity';
import { UpdateStaffProfileDto } from './dto/update-staff-profile.dto';

@Injectable()
export class StaffProfileService {
  constructor(
    @InjectRepository(StaffProfile)
    private staffProfileRepository: Repository<StaffProfile>,

    @InjectRepository(Email)
    private emailRepository: Repository<Email>,

    @InjectRepository(Telephone)
    private telephoneRepository: Repository<Telephone>,
  ) {}

  // Create a new staff profile
  async create(createProfileDto: CreateStaffProfileDto): Promise<StaffProfile> {
    const { emails, telephones, ...profileData } = createProfileDto;

    const newProfile = this.staffProfileRepository.create(profileData);

    if (emails && emails.length) {
      newProfile.emails = emails.map((email) => {
        const newEmail = new Email();
        newEmail.email = email;
        return newEmail;
      });
    }

    if (telephones && telephones.length) {
      newProfile.telephones = telephones.map((telephone) => {
        const newTelephone = new Telephone();
        newTelephone.phoneNumber = telephone;
        return newTelephone;
      });
    }

    return this.staffProfileRepository.save(newProfile);
  }

  // Get all staff profiles
  async findAll(): Promise<StaffProfile[]> {
    return this.staffProfileRepository.find();
  }

  // Get a single staff profile by ID
  async findOne(id: string): Promise<StaffProfile> {
    return this.staffProfileRepository.findOne({ where: { id } });
  }

  // Update a staff profile by ID
  async update(
    id: string,
    updateProfileDto: UpdateStaffProfileDto,
  ): Promise<StaffProfile> {
    const { emails, telephones, ...profileData } = updateProfileDto;

    // Update profile
    await this.staffProfileRepository.update(id, profileData);

    const profile = await this.staffProfileRepository.findOne({
      where: { id },
    });

    // Update emails if provided
    if (emails && emails.length) {
      await this.emailRepository.delete({ profile }); // Delete old emails
      profile.emails = emails.map((email) => {
        const newEmail = new Email();
        newEmail.email = email;
        return newEmail;
      });
    }

    // Update telephones if provided
    if (telephones && telephones.length) {
      await this.telephoneRepository.delete({ profile }); // Delete old telephones
      profile.telephones = telephones.map((telephone) => {
        const newTelephone = new Telephone();
        newTelephone.phoneNumber = telephone;
        return newTelephone;
      });
    }

    return this.staffProfileRepository.save(profile);
  }

  // Method to update the isApproved field
  async approveProfile(id: string, isApproved: boolean): Promise<StaffProfile> {
    const profile = await this.findOne(id);

    profile.isApproved = isApproved; // Update the isApproved field
    return this.staffProfileRepository.save(profile); // Save changes to the database
  }

  // Delete a staff profile by ID
  async remove(id: string): Promise<void> {
    await this.staffProfileRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export abstract class ProfileService {
  abstract findAll();
  abstract findOne(id: number);
  abstract create(createProfileDto: CreateProfileDto);
}

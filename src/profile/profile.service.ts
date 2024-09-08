import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class ProfileService {
  abstract findAll();
  abstract findOne(id: number);
}

import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}

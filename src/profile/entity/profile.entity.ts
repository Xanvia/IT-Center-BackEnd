import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class Profile {
  @PrimaryGeneratedColumn()
  id: string;
}

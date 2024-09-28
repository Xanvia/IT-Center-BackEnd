import { Title } from 'enums/title.enum';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  displayName: string;

  @Column({ type: 'enum', enum: Title })
  title: Title;

  @Column({ default: false })
  isApproved: boolean;
}

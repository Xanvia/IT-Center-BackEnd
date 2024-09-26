import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Content } from './content.entity';

@Entity()
export class ContentImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  path: string;

  @ManyToOne(() => Content, (parent) => parent.images)
  profile: Content;
}

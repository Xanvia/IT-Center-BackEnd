import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';
import { ContentImage } from './contentImage.entity';

// appling Single Table Inheritance architecture
@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column()
  description: string;

  @Column({ type: 'date', nullable: true })
  date?: Date;

  @OneToMany(() => ContentImage, (item) => item.profile, {
    cascade: true,
    eager: true,
  })
  images: ContentImage[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

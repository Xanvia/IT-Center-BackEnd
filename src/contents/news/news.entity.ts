import { Column, Entity } from 'typeorm';
import { Content } from '../content.entity';

@Entity()
export class News extends Content {
  @Column({ type: 'time', nullable: true })
  time?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  venue?: string;
}

import { Entity } from 'typeorm';
import { Content } from '../content.entity';

@Entity()
export class News extends Content {}

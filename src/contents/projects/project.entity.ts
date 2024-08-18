import { ChildEntity } from 'typeorm';
import { Content } from '../content.entity';

@ChildEntity()
export class Project extends Content {}

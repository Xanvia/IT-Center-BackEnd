import { ChildEntity } from 'typeorm';
import { Role } from 'enums/role.enum';
import { Admin } from './admin.entity';

@ChildEntity(Role.S_ADMIN)
export class SuperAdmin extends Admin {}

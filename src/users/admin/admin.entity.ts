import { ChildEntity, Column } from 'typeorm';
import { Staff } from '../staff/staff.entity';
import { Role } from 'enums/role.enum';

@ChildEntity(Role.ADMIN)
export class Admin extends Staff {}

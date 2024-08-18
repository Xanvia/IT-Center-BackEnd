import { ChildEntity, Column } from 'typeorm';
import { User } from '../user.entity';
import { StaffProfile } from 'src/profile/staffProfile/entities/profile.entity';
import { Role } from 'enums/role.enum';

@ChildEntity(Role.STAFF)
export class Staff extends User {
  @Column()
  profile: StaffProfile;
}

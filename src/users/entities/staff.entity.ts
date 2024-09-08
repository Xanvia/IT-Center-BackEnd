import { ChildEntity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { StaffProfile } from 'src/profile/staffProfile/entities/profile.entity';
import { Role } from 'enums/role.enum';

@ChildEntity(Role.STAFF)
export class Staff extends User {
  @OneToOne(() => StaffProfile, (profile) => profile.user)
  @JoinColumn()
  profile: StaffProfile;
}

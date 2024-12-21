import { Profile } from 'src/profile/entity/profile.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { Email } from './email.entity';
import { Telephone } from './telephone.entity';
import { Staff } from 'src/users/entities/staff.entity';

@Entity()
export class StaffProfile extends Profile {
  @Column()
  designation: string;

  @Column({ nullable: true })
  nominal: string;

  @Column()
  extNo: string;

  @OneToMany(() => Email, (item) => item.profile, {
    cascade: true,
    eager: true,
  })
  emails: Email[];

  @OneToMany(() => Telephone, (item) => item.profile, {
    cascade: true,
    eager: true,
  })
  telephones: Telephone[];

  @OneToOne(() => Staff, (user) => user.staffProfile)
  user: Staff;

  @Column({ default: false })
  isApproved: boolean;

  @Column()
  requestBy: string;
}

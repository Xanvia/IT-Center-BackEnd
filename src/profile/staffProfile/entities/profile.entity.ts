import { Profile } from 'src/profile/entity/profile.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Emails } from './email.entity';
import { Telephone } from './telephone.entity';

@Entity()
export class StaffProfile extends Profile {
  @Column()
  displayName: string;

  @Column()
  designation: string;

  @Column()
  nominal: string;

  @Column()
  extNo: string;

  @OneToMany(() => Emails, (item) => item.profile, {
    cascade: true,
    eager: true,
  })
  emails: Emails[];

  @OneToMany(() => Telephone, (item) => item.profile, {
    cascade: true,
    eager: true,
  })
  telephones: Telephone[];
}

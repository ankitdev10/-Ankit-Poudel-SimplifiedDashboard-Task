import { Column, DeepPartial, Entity } from 'typeorm';
import { BaseEntity } from './base-entity';

@Entity()
export class User extends BaseEntity {
  constructor(input?: DeepPartial<User>) {
    super(input);
  }

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;
}

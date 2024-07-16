import { Column, DeepPartial, Entity, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity } from "./base-entity";
import { Project } from "./project.entity";

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

  @OneToMany(() => Project, (project) => project.manager)
  projects: Project[];
}

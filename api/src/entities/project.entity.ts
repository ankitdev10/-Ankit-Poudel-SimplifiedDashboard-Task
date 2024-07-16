import { Column, CreateDateColumn, Entity, Index, ManyToOne } from "typeorm";
import { BaseEntity } from "./base-entity";
import { User } from "./user.entity";

@Entity()
export class Project extends BaseEntity {
  constructor(input?: Partial<Project>) {
    super(input);
  }

  // index name of the project since we will have filter based on this
  @Column()
  @Index({ fulltext: true })
  name: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column()
  price: number;

  @CreateDateColumn()
  dueDate: Date;

  @ManyToOne(() => User, (user: User) => user.projects)
  manager: User;

  @Column({ default: 0 })
  progess: number;
}

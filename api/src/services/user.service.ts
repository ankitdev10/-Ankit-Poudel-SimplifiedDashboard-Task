import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcryptjs';
import { RequestContext } from 'src/api/request-context';
import { UserAlreadyExistsError } from 'src/common/errors/error';
import { User } from 'src/entities/user.entity';
import { CreateUserInput, ErrorResult } from 'src/generated';
import { DataSource, Repository } from 'typeorm';
import { ListQueryBuilder } from './common/list-query-builder';

@Injectable()
export class UserService {
  private userRepo: Repository<User>;
  constructor(
    private dataSource: DataSource,
    private listQueryBuilder: ListQueryBuilder,
  ) {
    this.userRepo = this.dataSource.getRepository(User);
  }

  async createUser(
    _ctx: RequestContext,
    input: CreateUserInput,
  ): Promise<User | ErrorResult> {
    const exists = await this.findOneByEmail(input.email);
    if (exists) {
      return new UserAlreadyExistsError();
    }

    const hashPw = hashSync(input.password, 10);
    const user = new User({
      ...input,
      password: hashPw,
    });
    const userr = await this.userRepo.save(user);
    console.log({ userr });

    return user;
  }

  async users() {
    const users = await this.listQueryBuilder
      .build(User)
      .getManyAndCount()
      .then(([items, totalItems]) => ({ items, totalItems }));
    return users;
  }

  // HELPERS
  async findOneByEmail(email: string) {
    return this.userRepo.findOne({
      where: { email },
    });
  }
}

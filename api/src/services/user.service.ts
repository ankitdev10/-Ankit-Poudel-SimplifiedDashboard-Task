import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare, hashSync } from "bcryptjs";
import { RequestContext } from "src/api/request-context";
import {
  InvalidCredentialsError,
  UserAlreadyExistsError,
} from "src/common/errors/error";
import { User } from "src/entities/user.entity";
import { CreateUserInput, ErrorResult, UpdateUserInput } from "src/generated";
import { ListQueryBuilder } from "./common/list-query-builder";
import { TransactionalConnection } from "./common/transaction-connection.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserService {
  constructor(
    private connection: TransactionalConnection,
    private listQueryBuilder: ListQueryBuilder,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

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
    const userr = await this.connection.getRepository(User).save(user);

    return user;
  }

  async users() {
    const users = await this.listQueryBuilder
      .build(User)
      .getManyAndCount()
      .then(([items, totalItems]) => ({ items, totalItems }));
    return users;
  }

  async login(ctx: RequestContext, username: string, password: string) {
    const user = await this.findOneByEmail(username);
    if (!user) {
      return new InvalidCredentialsError();
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      return new InvalidCredentialsError();
    }
    delete user.password;
    const token = await this.jwtService.sign(
      { user },
      {
        secret: this.configService.get<string>("JWT_SECRET"),
      },
    );
    ctx.res.header("auth-token", token);
    ctx.user = user;
    return user;
  }

  async getSession(token: string): Promise<any> {
    let user: User | undefined = undefined;
    try {
      const payload = await this.jwtService.verifyAsync(token.split(" ")[1], {
        secret: this.configService.get<string>("JWT_SECRET"),
      });
      if (!payload) throw new UnauthorizedException();

      user = await this.connection.getRepository(User).findOne({
        where: {
          id: payload.user.id,
        },
      });
    } catch (err) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async me(ctx: RequestContext) {
    return ctx.user;
  }

  async deleteUser(ctx: RequestContext, id: string) {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException();
    }

    if (user.id !== ctx.user.id) {
      throw new UnauthorizedException();
    }

    const res = await this.connection.getRepository(User).delete(id);

    if (!res.affected) {
      throw new InternalServerErrorException();
    }

    return { success: true, message: "User deleted successfully" };
  }

  async updateUser(ctx: RequestContext, id: string, input: UpdateUserInput) {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException();
    }
    if (user.id !== ctx.user.id) {
      throw new UnauthorizedException();
    }
    const updatedUser = await this.connection.getRepository(User).save({
      ...user,
      ...input,
    });
    return updatedUser;
  }

  // HELPERS

  async findOneById(id: string) {
    return this.connection.getRepository(User).findOne({
      where: { id },
    });
  }

  async findOneByEmail(email: string) {
    return this.connection.getRepository(User).findOne({
      where: { email },
    });
  }
}

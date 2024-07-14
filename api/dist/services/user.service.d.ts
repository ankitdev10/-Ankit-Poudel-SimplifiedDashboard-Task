import { RequestContext } from 'src/api/request-context';
import { User } from 'src/entities/user.entity';
import { CreateUserInput, ErrorResult } from 'src/generated';
import { DataSource } from 'typeorm';
import { ListQueryBuilder } from './common/list-query-builder';
export declare class UserService {
    private dataSource;
    private listQueryBuilder;
    private userRepo;
    constructor(dataSource: DataSource, listQueryBuilder: ListQueryBuilder);
    createUser(_ctx: RequestContext, input: CreateUserInput): Promise<User | ErrorResult>;
    users(): Promise<{
        items: User[];
        totalItems: number;
    }>;
    findOneByEmail(email: string): Promise<User>;
}

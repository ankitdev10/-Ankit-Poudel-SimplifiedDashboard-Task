import { MutationCreateUserArgs } from 'src/generated';
import { UserService } from 'src/services/user.service';
import { RequestContext } from '../request-context';
export declare class UserResolver {
    private userService;
    constructor(userService: UserService);
    createUser(ctx: RequestContext, args: MutationCreateUserArgs): Promise<import("../../entities/user.entity").User | import("src/generated").ErrorResult>;
    users(): Promise<{
        items: import("../../entities/user.entity").User[];
        totalItems: number;
    }>;
}

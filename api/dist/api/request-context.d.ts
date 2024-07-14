import { Request, Response } from 'express';
import { User } from '../entities/user.entity';
export declare class RequestContext {
    private readonly _req;
    private readonly _res;
    private _user;
    constructor(options: {
        req: Request;
        res: Response;
    });
    get req(): Request;
    get res(): Response;
    set user(user: User);
    get user(): User;
}

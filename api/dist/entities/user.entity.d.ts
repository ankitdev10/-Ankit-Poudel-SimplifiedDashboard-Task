import { DeepPartial } from 'typeorm';
import { BaseEntity } from './base-entity';
export declare class User extends BaseEntity {
    constructor(input?: DeepPartial<User>);
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

import { ID } from 'src/common/types';
import { DeepPartial } from 'typeorm';
export declare abstract class BaseEntity {
    protected constructor(input?: DeepPartial<BaseEntity>);
    id: ID;
    createdAt: Date;
    updatedAt: Date;
}

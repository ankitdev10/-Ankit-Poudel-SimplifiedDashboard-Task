export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<T extends {
    [key: string]: unknown;
}, K extends keyof T> = {
    [_ in K]?: never;
};
export type Incremental<T> = T | {
    [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
};
export type Scalars = {
    ID: {
        input: string;
        output: string;
    };
    String: {
        input: string;
        output: string;
    };
    Boolean: {
        input: boolean;
        output: boolean;
    };
    Int: {
        input: number;
        output: number;
    };
    Float: {
        input: number;
        output: number;
    };
    DateTime: {
        input: any;
        output: any;
    };
    JSON: {
        input: any;
        output: any;
    };
};
export type CreateUserInput = {
    email: Scalars['String']['input'];
    firstName: Scalars['String']['input'];
    lastName: Scalars['String']['input'];
    password: Scalars['String']['input'];
    phone: Scalars['String']['input'];
};
export type CreateUserResult = User | UserAlreadyExistsError;
export type Entity = {
    createdAt: Scalars['DateTime']['output'];
    id: Scalars['ID']['output'];
    updatedAt: Scalars['DateTime']['output'];
};
export declare enum ErrorCode {
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
    UNKNOWN_ERROR = "UNKNOWN_ERROR",
    USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS"
}
export type ErrorResult = {
    errorCode: ErrorCode;
    message: Scalars['String']['output'];
};
export type InvalidCredentialsError = ErrorResult & {
    __typename?: 'InvalidCredentialsError';
    errorCode: ErrorCode;
    message: Scalars['String']['output'];
};
export type LoginResult = InvalidCredentialsError | User;
export type Mutation = {
    __typename?: 'Mutation';
    createUser: User;
};
export type MutationCreateUserArgs = {
    input: CreateUserInput;
};
export type PaginatedList = {
    items: Array<Entity>;
    totalItems: Scalars['Int']['output'];
};
export type Query = {
    __typename?: 'Query';
    users: Array<User>;
};
export type Success = {
    __typename?: 'Success';
    message: Scalars['String']['output'];
    sucess: Scalars['Boolean']['output'];
};
export type User = Entity & {
    __typename?: 'User';
    createdAt: Scalars['DateTime']['output'];
    email: Scalars['String']['output'];
    firstName: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    lastName: Scalars['String']['output'];
    phone: Scalars['String']['output'];
    updatedAt: Scalars['DateTime']['output'];
};
export type UserAlreadyExistsError = ErrorResult & {
    __typename?: 'UserAlreadyExistsError';
    errorCode: ErrorCode;
    message: Scalars['String']['output'];
};

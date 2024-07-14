import { ErrorCode } from 'src/generated';
export declare class ErrorResult {
    readonly __typename: string;
    readonly errorCode: string;
    readonly message: string;
}
export declare class UserAlreadyExistsError extends ErrorResult {
    readonly __typename = "UserAlreadyExistsError";
    readonly errorCode: ErrorCode;
    readonly message: string;
}
export declare class InvalidCredentialsError extends ErrorResult {
    readonly __typename = "InvalidCredentialsError";
    readonly errorCode: ErrorCode;
    readonly message: string;
}
export declare const ErrorTypeResolver: {
    CreateUserResult: {
        __resolveType(value: any): any;
    };
    LoginResult: {
        __resolveType(value: any): any;
    };
};

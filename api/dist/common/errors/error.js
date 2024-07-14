"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorTypeResolver = exports.InvalidCredentialsError = exports.UserAlreadyExistsError = exports.ErrorResult = void 0;
const generated_1 = require("../../generated");
class ErrorResult {
}
exports.ErrorResult = ErrorResult;
class UserAlreadyExistsError extends ErrorResult {
    constructor() {
        super(...arguments);
        this.__typename = 'UserAlreadyExistsError';
        this.errorCode = generated_1.ErrorCode.USER_ALREADY_EXISTS;
        this.message = 'User already exists with this email.';
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
class InvalidCredentialsError extends ErrorResult {
    constructor() {
        super(...arguments);
        this.__typename = 'InvalidCredentialsError';
        this.errorCode = generated_1.ErrorCode.INVALID_CREDENTIALS;
        this.message = 'Invalid credentials.';
    }
}
exports.InvalidCredentialsError = InvalidCredentialsError;
const errorTypeNames = ['UserAlreadyExistsError,InvalidCredentialsError'];
function isGraphQLError(input) {
    return (input instanceof ErrorResult || errorTypeNames.includes(input.__typename));
}
exports.ErrorTypeResolver = {
    CreateUserResult: {
        __resolveType(value) {
            return isGraphQLError(value) ? value.__typename : 'User';
        },
    },
    LoginResult: {
        __resolveType(value) {
            return isGraphQLError(value) ? value.__typename : 'User';
        },
    },
};
//# sourceMappingURL=error.js.map
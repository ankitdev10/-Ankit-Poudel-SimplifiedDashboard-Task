"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestContext = void 0;
class RequestContext {
    constructor(options) {
        this._req = options.req;
        this._res = options.res;
    }
    get req() {
        return this._req;
    }
    get res() {
        return this._res;
    }
    set user(user) {
        this._user = user;
    }
    get user() {
        return this._user;
    }
}
exports.RequestContext = RequestContext;
//# sourceMappingURL=request-context.js.map
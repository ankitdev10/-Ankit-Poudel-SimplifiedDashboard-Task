"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcryptjs_1 = require("bcryptjs");
const error_1 = require("../common/errors/error");
const user_entity_1 = require("../entities/user.entity");
const typeorm_1 = require("typeorm");
const list_query_builder_1 = require("./common/list-query-builder");
let UserService = class UserService {
    constructor(dataSource, listQueryBuilder) {
        this.dataSource = dataSource;
        this.listQueryBuilder = listQueryBuilder;
        this.userRepo = this.dataSource.getRepository(user_entity_1.User);
    }
    async createUser(_ctx, input) {
        const exists = await this.findOneByEmail(input.email);
        if (exists) {
            return new error_1.UserAlreadyExistsError();
        }
        const hashPw = (0, bcryptjs_1.hashSync)(input.password, 10);
        const user = new user_entity_1.User({
            ...input,
            password: hashPw,
        });
        const userr = await this.userRepo.save(user);
        console.log({ userr });
        return user;
    }
    async users() {
        const users = await this.listQueryBuilder
            .build(user_entity_1.User)
            .getManyAndCount()
            .then(([items, totalItems]) => ({ items, totalItems }));
        return users;
    }
    async findOneByEmail(email) {
        return this.userRepo.findOne({
            where: { email },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        list_query_builder_1.ListQueryBuilder])
], UserService);
//# sourceMappingURL=user.service.js.map
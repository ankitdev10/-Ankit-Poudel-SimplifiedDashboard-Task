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
exports.ListQueryBuilder = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let ListQueryBuilder = class ListQueryBuilder {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    build(entity) {
        const repo = this.dataSource.getRepository(entity);
        const alias = entity.name;
        const qb = repo.createQueryBuilder(alias);
        return qb;
    }
};
exports.ListQueryBuilder = ListQueryBuilder;
exports.ListQueryBuilder = ListQueryBuilder = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ListQueryBuilder);
//# sourceMappingURL=list-query-builder.js.map
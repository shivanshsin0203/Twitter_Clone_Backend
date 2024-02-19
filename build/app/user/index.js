"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const types_1 = require("./types");
const queries_1 = require("./queries");
const resolver_1 = require("./resolver");
exports.user = {
    type: types_1.type,
    queries: queries_1.queries,
    resolvers: resolver_1.resolvers
};

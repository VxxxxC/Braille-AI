"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("./knex");
console.log('NODE_ENV:', process.env.NODE_ENV);
describe('knex migrate test', () => {
    it('migration should pass', () => __awaiter(void 0, void 0, void 0, function* () {
        let config = undefined;
        let all = true;
        yield knex_1.knex.migrate.rollback(config, all);
        yield knex_1.knex.migrate.latest();
    }));
    it('should running seed without error', () => __awaiter(void 0, void 0, void 0, function* () {
        yield knex_1.knex.seed.run();
    }));
});

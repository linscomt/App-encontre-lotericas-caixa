"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const urls_json_1 = __importDefault(require("./urls.json"));
(async () => {
    console.log(urls_json_1.default);
})();

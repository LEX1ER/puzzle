"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.PuzzleConfig = exports.Puzzle = void 0;
const http_1 = require("http");
const route_1 = require("./route");
class Puzzle {
    static configureDefaults(puzzleConfig = new PuzzleConfig()) {
        var _a, _b;
        puzzleConfig.controllerFolder = (_a = puzzleConfig.controllerFolder) !== null && _a !== void 0 ? _a : "./controllers";
        puzzleConfig.port = (_b = puzzleConfig.port) !== null && _b !== void 0 ? _b : 3000;
        return puzzleConfig;
    }
    static createServer(puzzleConfig = new PuzzleConfig()) {
        puzzleConfig = this.configureDefaults(puzzleConfig);
        const server = (0, http_1.createServer)((request, response) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                let url = ((_a = request.url) === null || _a === void 0 ? void 0 : _a.endsWith("/")) ? (_b = request.url) === null || _b === void 0 ? void 0 : _b.slice(0, -1) : request.url;
                let classController = (_c = request.url) === null || _c === void 0 ? void 0 : _c.substring(1).split("/")[0];
                let module = yield Promise.resolve().then(() => __importStar(require(`${puzzleConfig.controllerFolder}/${classController}-controller`)));
                let initializedClass = new module.default();
                initializedClass.setRequest(request);
                initializedClass.setResponse(response);
                let routeDetail = route_1.routeDetails.filter(x => x.url.trimEnd() == (url === null || url === void 0 ? void 0 : url.trimEnd()) && x.methods.includes(request.method))[0];
                if (!routeDetail)
                    throw Error(`Cannot find route '${url}'`);
                initializedClass[routeDetail.propertyKey]();
            }
            catch (error) {
                response.end(error.toString());
            }
        }));
        server.listen(puzzleConfig.port);
    }
}
exports.Puzzle = Puzzle;
class PuzzleConfig {
    constructor() {
        this.controllerFolder = `./src/controllers/`;
        this.port = 3000;
    }
}
exports.PuzzleConfig = PuzzleConfig;

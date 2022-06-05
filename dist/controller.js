"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
class Controller {
    constructor() {
    }
    setRequest(request) {
        this.request = request;
    }
    setResponse(response) {
        this.response = response;
    }
    render(url) {
        if (this.response != null) {
            return this.response.end(url);
        }
    }
}
exports.Controller = Controller;

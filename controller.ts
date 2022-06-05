import { IncomingMessage, ServerResponse } from "http";

export class Controller {
    constructor() {
        // console.log("Main Controller")
    }

    private setRequest(request?: IncomingMessage) {
        this.request = request;
    }
    protected request?: IncomingMessage;

    private setResponse(response?: ServerResponse) {
        this.response = response;
    }

    protected response?: ServerResponse;

    protected render(url: string) {
        if (this.response != null) {
            return this.response.end(url)
        }
    }
}
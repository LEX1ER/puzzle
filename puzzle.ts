import { createServer, IncomingMessage, ServerResponse } from 'http';
import { routeDetails } from './route';

export class Puzzle {
    private static configureDefaults(puzzleConfig: IPuzzleConfig = new PuzzleConfig()): IPuzzleConfig {
        puzzleConfig.controllerFolder = puzzleConfig.controllerFolder ?? "./controllers";
        puzzleConfig.port = puzzleConfig.port ?? 3000;

        return puzzleConfig;
    }

    static createServer(puzzleConfig: IPuzzleConfig = new PuzzleConfig()) {
        puzzleConfig = this.configureDefaults(puzzleConfig);

        const server = createServer(async (request: IncomingMessage, response: ServerResponse) => {
            try {
                let url = request.url?.endsWith("/") ? request.url?.slice(0, -1) : request.url;
                let classController = request.url?.substring(1).split("/")[0];

                let module = await import(`${puzzleConfig.controllerFolder}/${classController}-controller`);
                let initializedClass = new module.default();
                initializedClass.setRequest(request)
                initializedClass.setResponse(response)

                let routeDetail = routeDetails.filter(x => x.url.trimEnd() == url?.trimEnd() && x.methods.includes(request.method as string))[0];

                // let propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(initializedClass));

                if (!routeDetail) throw Error(`Cannot find route '${url}'`);
                initializedClass[routeDetail.propertyKey]();

            } catch (error) {
                response.end((error as any).toString())
            }
        });

        server.listen(puzzleConfig.port);
    }
}

export interface IPuzzleConfig {
    port?: number
    controllerFolder?: string
}

export class PuzzleConfig implements IPuzzleConfig {
    controllerFolder?: string = `./src/controllers/`;
    port?: number = 3000;
}
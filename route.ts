
let routeDetails: IRoute[] = [] as IRoute[];
export function route(route: { name: string, url: string, methods?: ("GET" | "POST" | "PUT" | "DELETE")[] }) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let newMethods = ((route.methods == undefined) ? ["GET"] : route.methods.length == 0 ? ["GET"] : route.methods) as string[];

        routeDetails.push({
            name: route.name,
            url: route.url,
            methods: newMethods,
            target, propertyKey, descriptor
        })
    };
}

export interface IRoute {
    name: string,
    url: string,
    methods: string[],
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
}

export {
    routeDetails
}
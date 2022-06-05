"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeDetails = exports.route = void 0;
let routeDetails = [];
exports.routeDetails = routeDetails;
function route(route) {
    return function (target, propertyKey, descriptor) {
        let newMethods = ((route.methods == undefined) ? ["GET"] : route.methods.length == 0 ? ["GET"] : route.methods);
        routeDetails.push({
            name: route.name,
            url: route.url,
            methods: newMethods,
            target, propertyKey, descriptor
        });
    };
}
exports.route = route;

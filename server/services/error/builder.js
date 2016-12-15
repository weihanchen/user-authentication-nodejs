'use strict';
exports.badRequest = (message) => {
    return {
        message: message || /* istanbul ignore next: tired of writing tests */ 'bad request',
        status: 400
    }
}
exports.unauthorized = (message) => {
    return {
        message: message || /* istanbul ignore next: tired of writing tests */ 'unauthorized',
        status: 401
    }
}
exports.notFound = (message) => {
    return {
        message: message || /* istanbul ignore next: tired of writing tests */ 'not found',
        status: 404
    }
}
exports.internalServerError = (message) => {
    return {
        message: message || /* istanbul ignore next: tired of writing tests */ 'Internal server error',
        status: 500
    }
}

'use strict';
exports.badRequest = (message) => {
    return {
    	message: message || 'bad request',
    	status: 400
    }
}
exports.unauthorized = (message) => {
   return {
    	message: message || 'unauthorized',
    	status: 401
    }
}
exports.notFound = (message) => {
    return {
    	message: message || 'not found',
    	status: 404
    }
}
exports.internalServerError = (message) =>{
    return {
        message: message || 'Internal server error',
        status: 500
    }
}

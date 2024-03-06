/* eslint-disable no-unused-vars */
import StandardError from '../errors/standardError.js';
import NotFound from '../errors/notFound.js';
import AlreadyExist from '../errors/alreadyExist.js';
import Unauthorized from '../errors/unauthorized.js';
import Conflict from '../errors/conflict.js';
import BadRequest from '../errors/badRequest.js';



function errorHandler(error, req, res, next) {
    if (error instanceof NotFound) {
        new NotFound(error.message).sendReply(res);
    } else if (error instanceof AlreadyExist) {
        new AlreadyExist(error.message).sendReply(res);
    } else if  (error instanceof Unauthorized) {
        new Unauthorized(error.message).sendReply(res);
    } else if (error instanceof Conflict) {
        new Conflict(error.message).sendReply(res);
    } else if (error instanceof BadRequest) {
        new BadRequest(error.message).sendReply(res);
    } else {
        console.log(error);
        new StandardError().sendReply(res);
    }
}

export default errorHandler;

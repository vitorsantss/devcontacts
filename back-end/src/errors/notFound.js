import StandardError from './standardError.js';

class NotFound extends StandardError {
    constructor(message) {
        super(message, 404);
    }
}

export default NotFound;
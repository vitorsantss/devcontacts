import StandardError from './standardError.js';

class Unauthorized extends StandardError {
    constructor(message) {
        super(message, 401);
    }
}

export default Unauthorized;
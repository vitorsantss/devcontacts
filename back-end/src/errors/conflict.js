import StandardError from './standardError.js';

class Conflict extends StandardError {
    constructor(message) {
        super(message, 409);
    }
}

export default Conflict;
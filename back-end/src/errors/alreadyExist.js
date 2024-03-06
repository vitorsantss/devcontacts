import StandardError from './standardError.js';

class AlreadyExist extends StandardError {
    constructor(message) {
        super(message, 422);
    }
}

export default AlreadyExist;
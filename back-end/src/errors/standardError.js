class StandardError extends Error {
    constructor(message = 'Erro interno no servidor', status = 500) {
        super(message);
        this.message = message;
        this.status = status;
    }

    sendReply(res) {
        res.status(this.status).json({
            error: {
                message: this.message,
                status: this.status
            }
        });
    }
}

export default StandardError;
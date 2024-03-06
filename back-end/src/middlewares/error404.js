import notFound from '../errors/notFound.js';

function error404(req, res, next) {
    const error = new notFound('Página não encontrada.');
    next(error);
}

export default error404;
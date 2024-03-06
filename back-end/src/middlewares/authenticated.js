import jsonwebtoken from 'jsonwebtoken';
import Unauthorized from '../errors/unauthorized.js';

const { verify, decode } = jsonwebtoken;

export default async function (req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return new Unauthorized('Access token não informado').sendReply(res);
    }

    const [, accessToken] = token.split(' ');

    try {
        verify(accessToken, process.env.SECRET_KEY);

        const { id, email } = await decode(accessToken);
        req.userId= id;
        req.userEmail = email;

        return next();

    } catch (error) {
        new Unauthorized('Usuário não autorizado.').sendReply(res);
    }
}

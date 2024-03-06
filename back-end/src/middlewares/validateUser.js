import { string, object } from 'yup';
import BadRequest from '../errors/badRequest.js';

class ValidateUser {

    static async createUser(req, res, next) {

        const userSchema = object().shape({
            username: string().required('Nome de usuário é obrigatório.'),
            email: string().email('Por favor, insira um endereço de e-mail válido.').required('E-mail é obrigatório.'),
            password: string().min(8,'Por favor, insira uma senha com pelo menos 8 caracteres.').required('Senha é obrigatória.')
        });

        try {
            await userSchema.validate(req.body, { abortEarly: false });
            return next();
        } catch (error) {
            const yupError = error;
            const errors = {};

            yupError.inner.forEach(error => {
                if (error.path === undefined) return;
                errors[error.path] = error.message;
            });

            return new BadRequest(errors).sendReply(res);
        }
    }

    static async alterUser(req, res, next) {
        const userSchema = object().shape({
            username: string(),
            email: string().email('Por favor, insira um endereço de e-mail válido.'),
            password: string().min(8,'Por favor, insira uma senha com pelo menos 8 caracteres.').required('Por favor, forneça sua senha atual para concluir a atualização do usuário.'),
            newPassword: string().min(8,'Por favor, insira uma senha com pelo menos 8 caracteres.')
        });

        try {
            await userSchema.validate(req.body, { abortEarly: false });
            return next();
        } catch (error) {
            const yupError = error;
            const errors = {};

            yupError.inner.forEach(error => {
                if (error.path === undefined) return;
                errors[error.path] = error.message;
            });

            return new BadRequest(errors).sendReply(res);
        }
    }
}

export default ValidateUser;
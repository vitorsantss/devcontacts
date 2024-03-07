/* eslint-disable no-useless-escape */
import { string, object } from 'yup';
import BadRequest from '../errors/badRequest.js';

class ValidateContact {

    static async createContact(req, res, next) {

        const contactSchema = object().shape({
            name: string().required('Nome do contato é obrigatório.'),
            email: string().email('Por favor, insira um endereço de e-mail válido.').required('E-mail é obrigatório.'),
            phone: string().matches(/^[1-9]{2}(?:[2-8]|9[0-9])[0-9]{3}[0-9]{4}$/, 'Por favor, insira um número de telefone válido. O formato aceito é (xx) xxxxx-xxxx').required('Número de telefone é obrigatório.'),
            position: string(),
            github: string()
        });

        try {
            await contactSchema.validate(req.body, { abortEarly: false });
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

    static async alterContact(req, res, next) {
        const contactSchema = object().shape({
            name: string(),
            email: string().email('Por favor, insira um endereço de e-mail válido.'),
            phone: string().matches(/^\d{2}(?:[2-8]|9[0-9])[0-9]{3}[0-9]{4}$/, 'Por favor, insira um número de telefone válido'),
            position: string(),
            github: string()
        });

        try {
            await contactSchema.validate(req.body, { abortEarly: false });
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

export default ValidateContact;
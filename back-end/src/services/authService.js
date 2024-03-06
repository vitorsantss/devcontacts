import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import NotFound from '../errors/notFound.js';
import Unauthorized from '../errors/unauthorized.js';

const prisma = new PrismaClient();
const { sign } = jsonwebtoken;

class AuthService {
    static async login(dto) {
        try {
            const user = await prisma.user.findFirst({ 
                where: {
                    email: dto.email
                }
            });
    
            if (!user) {
                throw new NotFound('Usuário não encontrado.');
            }
    
            const comparePassword = await bcrypt.compare(dto.password, user.password);
    
            if (!comparePassword) {
                throw new Unauthorized('Email ou senha inválidos.');
            }
    
            const token = sign({
                id: user.id,
                email: user.email
            },  process.env.SECRET_KEY,
            {
                expiresIn: '2h'
            });

            const dados = {
                id: user.id,
            };
    
            return { token, dados};
        } catch (error) {

            if (error instanceof NotFound || error instanceof Unauthorized) {
                throw error;
            } else {
                throw new Error(error);
            }
        }
    }
}

export default AuthService;

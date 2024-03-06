/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import NotFound from '../errors/notFound.js';
import AlreadyExist from '../errors/alreadyExist.js';
import Conflict from '../errors/conflict.js';
import BadRequest from '../errors/badRequest.js';

class UserService {

    static async listUsers(skip, take) {
        try {

            const [users, total] = await prisma.$transaction([
                prisma.user.findMany({
                    skip,
                    take
                }),
                prisma.user.count()
            ]);

            const totalPage = Math.ceil(total / take);

            return { total, totalPage, users };
        } catch (error) {
            throw new Error(error);
        }
        
    }

    static async listUser(dto) {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    id: dto.id
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    contacts: true
                }
            });

            if (!user) {
                throw new NotFound('Usuário não encontrado.');
            }

            return user;
        } catch (error) {
            if (error instanceof NotFound) {
                throw error;
            } else {
                throw Error(error);
            }
        }
    }
    
    static async createUser(dto) {
        const user = await prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });

        try {

            if (user) {
                throw new AlreadyExist('O endereço de e-mail fornecido já está em uso.');
            }

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(dto.password, salt);
            const newUser = {
                username: dto.username,
                email: dto.email,
                password: hashPassword
            };
            await prisma.user.create({data: newUser});

            return newUser;

        } catch (error) {
            if (error instanceof AlreadyExist) {
                throw error;
            } else {
                throw Error(error);
            }
        }
    }

    
    static async updateUser(dto) {
        const user = await prisma.user.findFirst({
            where: { 
                id: dto.id
            }
        });

        try {
            if (!user) {
                throw new NotFound('Usuário não encontrado.');
            }

            if (dto.username || dto.email || dto.newPassword) {
                if (dto.password === user.password) {

                    if (dto.username) {
                        user.username = dto.username;
                    }
    
                    if (dto.email) {
    
                        if (dto.email === user.email) { 
                            throw new Conflict('O endereço de e-mail fornecido não pode ser o mesmo que o endereço atual.');
                        }
                        user.email = dto.email;
                    }
    
                    if (dto.newPassword) {
    
                        if (dto.newPassword === user.password) {
                            throw new Conflict('A senha fornecida não pode ser a mesma que a atual.');
                        }
    
                        const salt = await bcrypt.genSalt(10);
                        const hashPassword = await bcrypt.hash(dto.newPassword, salt);
                        user.password = hashPassword;
                    }
    
                    await prisma.user.update({data: {user}});
                
                } 
            } else {
                throw new BadRequest('Por favor, forneça pelo menos um dado para atualizar.');
            }

        } catch (error) {
            if (error instanceof Conflict || error instanceof NotFound || error instanceof BadRequest) {
                throw error;
            } else {
                throw Error(error);
            }
        }
    }

    static async deleteUser(id) {
        const user = await this.listUser(id);
        try {
            await prisma.user.delete({where: {id: user.id}});
        } catch (error) {
            throw new Error(error);
        }
    }
}


export default UserService;
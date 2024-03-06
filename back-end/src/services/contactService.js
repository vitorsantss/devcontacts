/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import NotFound from '../errors/notFound.js';
import AlreadyExist from '../errors/alreadyExist.js';
import BadRequest from '../errors/badRequest.js';
import Unauthorized from '../errors/unauthorized.js';

class ContactService {

    static async listContacts(skip, take) {
        try {
            const [contacts, total] = await prisma.$transaction([
                prisma.contact.findMany({
                    orderBy: {
                        name: 'asc'
                    },
                    skip,
                    take
                }),
                prisma.contact.count()
            ]);

            const totalPage = Math.ceil(total / take);
            
            return { total, totalPage, contacts };
        } catch (error) {
            throw new Error(error);
        }
    }

    static async listContact(dto) {
        try {
            const contact = await prisma.contact.findFirst({
                where: {
                    id: dto.id
                }
            });

            if (!contact) {
                throw new NotFound('Contato não encontrado.');
            }

            return contact;
        } catch (error) {
            if (error instanceof NotFound) {
                throw error;
            } else {
                throw Error(error);
            }
        }
    }


    static async searchContact(dto) {
        const search = dto.search;
        try{

            const contacts = await prisma.contact.findMany({
                where: {
                    OR: [
                        {
                            phone: {
                                contains: search
                            }
                        },
                        {
                            name: {
                                contains: search
                            }
                        }
                    ]
                },
                skip: dto.skip,
                take: dto.take
            });

            const total = contacts.length;
            const totalPage = Math.ceil(total / dto.take);


            if (contacts.length === 0) {
                throw new NotFound('Nenhum contato encontrado.');
            }

            return { total, totalPage, contacts };

        } catch(error) {
            if (error instanceof NotFound) {
                throw error;
            } else {
                throw Error(error);
            }
        }
    }

    
    static async createContact(dto) {
        const phone = await prisma.contact.findUnique({
            where: {
                phone: dto.phone,
            }
        });

        const email = await prisma.contact.findUnique({
            where: {
                email: dto.email,
            }
        });

        try {
            if (phone) {
                throw new AlreadyExist('Já existe um contato com esse número.');
            } else if (email) {
                throw new AlreadyExist('Já existe um contato com esse e-mail.');
            }

            const user = prisma.user.findFirst({
                where: {
                    id: dto.userId
                }
            });

            if (!user) {
                new Unauthorized('Não foi possível criar o contato. Usuário não autenticado').sendReply(res);
            }

            const newContact = {
                name: dto.name,
                email: dto.email,
                phone: dto.phone,
                userId: dto.userId
            };

            if (dto.position) {
                newContact.position = dto.position;
            }

            if (dto.github) {
                newContact.github = dto.github;
            }

            await prisma.contact.create({data: newContact});

            return newContact;
        } catch (error) {
            if (error instanceof AlreadyExist) {
                throw error;
            } else {
                throw Error(error);
            }
        }
    }

    
    static async updateContact(dto) {
        const contact = await this.listContact(dto.id);

        try { 
            if (dto.name || dto.email || dto.phone || dto.position || dto.github) {
                if (!contact) {
                    throw new NotFound('Contato não encontrado.');
                }
    
                const newContact = {};
    
                if (dto.name) {
                    newContact.name = dto.name;
                }
    
                if (dto.email) {
                    newContact.email = dto.email;
                }
    
                if (dto.phone) {
                    newContact.phone = dto.phone;
                }
    
                if (dto.position) {
                    newContact.position = dto.position;
                }
    
                if (dto.github) {
                    newContact.github = dto.github;
                }
                
                await prisma.contact.update({
                    where: {
                        id: contact.id
                    },
                    data: newContact
                });
            } else {
                throw new BadRequest('Por favor, forneça pelo menos um dado para atualizar.');
            }
        } catch (error) {
            if (error instanceof NotFound) {
                throw error;
            } else if (error instanceof BadRequest) {
                throw error;
            } else {
                throw Error(error);
            }
        }
    }

    static async deleteContact(id) {
        const contact = await this.listContact(id);
        try {
            await prisma.contact.delete({where: {id: contact.id}});
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default ContactService;
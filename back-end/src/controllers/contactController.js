import ContactService from '../services/contactService.js';

class ContactController {

    static async listContacts(req, res, next) {
        try {
            const skip = Number(req?.query?.skip) || 0;
            const take = Number(req?.query?.take) || 5;

            const contact = await ContactService.listContacts(skip, take);     
            res.status(200).json({ dados: contact });
        } catch (error) {
            next(error);
        }
    }

    static async listContact(req, res, next) {
        try {
            const { id } = req.params;
            const contact = await ContactService.listContact({ id });
            res.status(200).json({ dados: contact });
        } catch (error) {
            next(error);
        }
    }

    static async searchContact(req, res, next) {
        const { search } = req.query;
        const skip = Number(req?.query?.skip) || 0;
        const take = Number(req?.query?.take) || 5;

        try {
            const result = await ContactService.searchContact({ search, skip, take });
            res.status(200).json({ dados: result});
        } catch (error) {
            next(error);
        }
    }

    static async createContact(req, res, next) {
        const userId = req.userId;
        const { name, email, phone, position, github } = req.body;

        try {
            const contact = await ContactService.createContact({ userId, name, email, phone, position, github  });
            res.status(201).json({ message: 'Contato criado com sucesso!', dados: contact });
        } catch (error) {
            next(error);
        }
    }

    static async updateContact(req, res, next) {
        const id = req.params;
        const { name, email, phone, position, github } = req.body;
        
        try {
            const contact = await ContactService.updateContact({ id, name, email, phone, position, github });
            res.status(200).json({ message: 'Contato atualizado com sucesso!', dados: contact });
        } catch (error) {
            next(error);
        }
    }

    static async deleteContact(req, res, next) {
        const id = req.params;

        try {
            await ContactService.deleteContact(id);
            res.status(200).json({ message: 'Contato deletado com sucesso!' });
        } catch (error) {
            next(error);
        }
    }
}

export default ContactController;
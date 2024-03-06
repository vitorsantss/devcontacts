import UserService from '../services/userService.js';

class UserController {

    static async listUsers(req, res, next) {
        try {
            const skip = Number(req?.query?.skip) || 0;
            const take = Number(req?.query?.take) || 5;

            const users = await UserService.listUsers(skip, take);     
            res.status(200).json({ dados: users });
        } catch (error) {
            next(error);
        }
    }

    static async listUser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await UserService.listUser({ id });  
            res.status(200).json({ dados: user });
        } catch (error) {
            next(error);
        }
    }

    static async createUser(req, res, next) {
        const { username, email, password } = req.body;
        try {
            const user = await UserService.createUser({ username, email, password });
            res.status(201).json({ message: 'Usuário criado com sucesso!', dados: { username: user.username, email: user.email } });
        } catch (error) {
            next(error);
        }
    }

    static async updateUser(req, res, next) {
        const { id } = req.params;
        const { username, email, password, newPassword } = req.body;
        try {
            const user = await UserService.updateUser({ id, password, username, email, newPassword });
            res.status(200).json({ message: 'Usuário atualizado com sucesso!', dados: user });
        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(req, res, next) {
        const id = req.params;

        try {
            await UserService.deleteUser(id);
            res.status(200).json({ message: 'Usuário deletado com sucesso!' });
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;
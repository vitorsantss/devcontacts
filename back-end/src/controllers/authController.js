import AuthService from '../services/authService.js';

class AuthController {
    static async login(req, res, next) {
        const { email, password } = req.body;
        
        try {
            const login = await AuthService.login({ email, password });
            res.status(200).send(login);
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;

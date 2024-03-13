import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Devcontacts - API\n\nServer is running and listening on\nhttp://localhost:${PORT}`);
});

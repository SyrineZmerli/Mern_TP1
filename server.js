const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');
const packageInfo = require('./package.json');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/articles', articleRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Bonjour, je suis l’API du blog'
    });
});

app.get('/api/appInfo', (req, res) => {
    res.json({
        AppName: packageInfo.name,
        Author: packageInfo.author,
        Version: packageInfo.version
    });
});

(async () => {
    try {
        await connectDB(process.env.MONGODB_URI);

        app.listen(PORT, () => {
            console.log(`MERN server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Critical server startup error:', err.message);
        process.exit(1);
    }
})();

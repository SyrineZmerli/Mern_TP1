const express = require('express');
const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');
const packageInfo = require('./package.json');

const app = express();
const PORT = 3000;

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

app.listen(PORT, () => {
    console.log(`Serveur disponible sur http://localhost:${PORT}`);
});
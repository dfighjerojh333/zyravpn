const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    try {
        const configPath = path.join(__dirname, 'config.json');
        const configData = fs.readFileSync(configPath, 'utf8');
        const config = JSON.parse(configData);
        res.render('index', { downloadUrl: config.downloadUrl });
    } catch (error) {
        console.error('Error reading config:', error);
        res.render('index', { downloadUrl: '#' });
    }
});

app.listen(PORT, () => {
    console.log(`ZyraVPN is running on port ${PORT}`);
});
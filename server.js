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
    const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
    res.render('index', { ctaUrl: config.ctaUrl });
  } catch (e) {
    console.error(e);
    res.render('index', { ctaUrl: '#' });
  }
});

app.listen(PORT, () => {
  console.log(`ZyraVPN landing running on port ${PORT}`);
});

const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Health check endpoint
app.get('/up', (req, res) => {
    res.status(200).send('ok');
});

// Serve static files
app.use(express.static(path.join(__dirname, '.')));

// Serve index.html for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

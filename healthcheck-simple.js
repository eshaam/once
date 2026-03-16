const express = require('express');
const app = express();
const port = process.env.HEALTH_PORT || 3001;

// Simple health check endpoint (matches Rails format)
app.get('/up', (req, res) => {
    res.json({ status: "OK" });
});

// Detailed health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: "OK",
        timestamp: new Date().toISOString()
    });
});

app.listen(port, () => {
    console.log(`Health check service running on port ${port}`);
});
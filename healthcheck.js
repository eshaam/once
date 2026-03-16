const express = require('express');
const app = express();
const port = process.env.HEALTH_PORT || 3001;

// Database connection check
async function checkDatabaseConnection() {
    const dbType = process.env.DB_TYPE || 'none';

    switch (dbType) {
        case 'postgres':
            const { Pool } = require('pg');
            const pgPool = new Pool({
                connectionString: process.env.DATABASE_URL
            });
            try {
                await pgPool.query('SELECT 1');
                await pgPool.end();
                return true;
            } catch (error) {
                return false;
            }

        case 'mysql':
            const mysql = require('mysql2/promise');
            const mysqlConnection = await mysql.createConnection({
                host: process.env.DB_HOST || 'localhost',
                user: process.env.DB_USER || 'root',
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            });
            try {
                await mysqlConnection.query('SELECT 1');
                await mysqlConnection.end();
                return true;
            } catch (error) {
                return false;
            }

        case 'mongodb':
            const { MongoClient } = require('mongodb');
            const mongoClient = new MongoClient(process.env.MONGODB_URI);
            try {
                await mongoClient.connect();
                await mongoClient.db().admin().ping();
                await mongoClient.close();
                return true;
            } catch (error) {
                return false;
            }

        case 'none':
        default:
            // No database configured, return healthy
            return true;
    }
}

// Health check endpoint
app.get('/up', async (req, res) => {
    try {
        const dbHealthy = await checkDatabaseConnection();

        if (dbHealthy) {
            res.json({ status: "OK" });
        } else {
            res.status(503).json({ status: "DOWN", message: "Database connection failed" });
        }
    } catch (error) {
        res.status(503).json({ status: "DOWN", message: error.message });
    }
});

// Detailed health check endpoint
app.get('/health', async (req, res) => {
    try {
        const dbHealthy = await checkDatabaseConnection();
        const status = dbHealthy ? "OK" : "DOWN";

        res.json({
            status: status,
            database: dbHealthy ? "connected" : "disconnected",
            timestamp: new Date().toISOString(),
            db_type: process.env.DB_TYPE || 'none'
        });
    } catch (error) {
        res.status(503).json({
            status: "DOWN",
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

app.listen(port, () => {
    console.log(`Health check service running on port ${port}`);
});
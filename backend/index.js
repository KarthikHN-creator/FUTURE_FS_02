const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db'); // Imports your database connection

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());

app.use(cors());
app.use(express.json());

// TEMPORARY ROUTE TO BUILD CLOUD TABLE
app.get('/api/setup', async (req, res) => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS leads (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                source VARCHAR(100),
                status ENUM('New', 'Contacted', 'Converted') DEFAULT 'New',
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        res.send("Cloud table created successfully!");
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
});

// 1. GET ROUTE: Fetch all leads from the database
app.get('/api/leads', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch leads' });
    }
});

// 2. POST ROUTE: Add a new lead to the database
app.post('/api/leads', async (req, res) => {
    try {
        const { name, email, source } = req.body;
        
        const [result] = await pool.query(
            'INSERT INTO leads (name, email, source) VALUES (?, ?, ?)',
            [name, email, source]
        );
        
        res.status(201).json({ 
            message: 'Lead added successfully!', 
            id: result.insertId 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add lead' });
    }
});

// 3. DELETE ROUTE: Remove a lead by ID
app.delete('/api/leads/:id', async (req, res) => {
    try {
        const leadId = req.params.id; 
        
        const [result] = await pool.query('DELETE FROM leads WHERE id = ?', [leadId]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Lead not found' });
        }
        
        res.json({ message: 'Lead deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete lead' });
    }
});

// 4. PUT ROUTE: Update a lead's status
app.put('/api/leads/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const [result] = await pool.query(
            'UPDATE leads SET status = ? WHERE id = ?',
            [status, id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Lead not found' });
        }
        
        res.json({ message: 'Status updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update status' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// Create web server


// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create web server
const app = express();

// Set up the web server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up the route
app.get('/comments', (req, res) => {
    fs.readFile('comments.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments.json');
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.post('/comments', (req, res) => {
    fs.readFile('comments.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments.json');
            return;
        }
        const comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('Error writing comments.json');
                return;
            }
            res.send('Comment added');
        });
    });
});

// Start the web server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});


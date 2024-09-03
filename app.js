const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors'); // Import the cors package

// Middleware to parse JSON requests
app.use(express.json());
// Enable CORS for all routes
app.use(cors());
// Endpoint to handle the request and call the GPT-4 API
app.post('/chat', async (req, res) => {
    const { message } = req.body;

    console.log(message)

    if (!message) {
        return res.status(400).send({ error: 'Message is required' });
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',
                messages: [{ role: 'user', content: message }],
            },
            {
                headers: {
                    'Authorization': `Bearer API-KEY`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Send the GPT-4 response back to the client
        res.send(response.data.choices[0].message);
    } catch (error) {
        console.error('Error calling GPT-4 API:', error);
        res.status(500).send({ error: 'Error calling GPT-4 API' });
    }
});

app.get('/hello', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.status(200).send("<h1>Hello GFG Learner!</h1>");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

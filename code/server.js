import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = 5173;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Replace 'YOUR_LOCATION_API_URL' with the actual API URL you are using
const LOCATION_API_URL = 'YOUR_LOCATION_API_URL';
const API_KEY = 'YOUR_API_KEY';  // If your API requires a key

// Routes
app.get('/api/location', async (req, res) => {
    try {
        const response = await axios.get(LOCATION_API_URL, {
            params: {
                key: API_KEY,
                // other params...
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/api/location', async (req, res) => {
    try {
        const response = await axios.get('YOUR_LOCATION_API_URL');
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const express = require('express');
const axios = require('axios');
const app = express();
const port = 80;

const webhooks = [
  "soon"
];

app.use(express.json());

app.post('/webhook/:number', async (req, res) => {
    const number = parseInt(req.params.number, 10);

    if (isNaN(number) || number < 1 || number > webhooks.length) {
        return res.status(418)
    }

    const webhookUrl = webhooks[number - 1];
    const data = req.body;

    try {
        const response = await axios.post(webhookUrl, data);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(500).send("internal server errir");
    }
});

app.listen(port, () => {
    console.log(port);
});

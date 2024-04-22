const express = require('express');
const app = express();
const PORT = 3000;

const slackAPI = require('./src/obtain_messages.js');

// Serve the HTML page
app.use(express.static('public'));

// Endpoint to get Slack messages (dummy data for now)
app.get('/get-slack-messages', async (req, res) => {
    // Dummy Slack messages data
    try {
        const slackMessages = await slackAPI.getSlackMessages();
        res.json(slackMessages);  // Return the data as JSON
    } catch (err) {
        res.status(500).send("Failure");
    }
    
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

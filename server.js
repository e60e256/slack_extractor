const express = require('express');
const app = express();
const PORT = 3000;

const slackAPI = require('./src/obtain_messages.js');
const utils = require('./src/utils.js');
var slackMessages = {};
// Serve the HTML page
app.use(express.static('public'));

// Endpoint to get Slack messages (dummy data for now)
app.get('/get-slack-messages', async (req, res) => {
    // Dummy Slack messages data
    try {
        slackMessages = await slackAPI.getSlackMessages();
        res.json(slackMessages);  // Return the data as JSON
    } catch (err) {
        res.status(500).send("Failure");
    }
    
});

app.get('/get-all-channels', async (req, res) => {
    // Dummy Slack messages data
    try {
        //console.log(slackMessages);
        let channelsList = utils.getAllChannelsFromJSON(slackMessages);
        res.json(channelsList);  // Return the data as JSON
    } catch (err) {
        res.status(500).send("Failure");
    }
    
});

app.get('/get-channels-messages', async (req, res) => {
    // Dummy Slack messages data
    try {
        //console.log(slackMessages);
        let channelsList = utils.getAllChannelsFromJSON(slackMessages);
        res.json(channelsList);  // Return the data as JSON
    } catch (err) {
        res.status(500).send("Failure");
    }
    
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

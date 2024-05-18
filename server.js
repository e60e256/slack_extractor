const express = require('express');
const app = express();
const PORT = 3000;

const slackAPI = require('./src/obtain_messages.js');
const utils = require('./src/utils.js');
var slackMessages = {};


const { Client } = require('pg');


  



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


// Obtain all messages from database in JSON
app.get('/get-channels-messages2', async (req, res) => {
    // Dummy Slack messages data
    try {
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
        });
        await client.connect();
        console.log('Connected to Postgres'); // Log message after successful connection
        let insertQuery = `SELECT * FROM slackdata.allmessages`;
        const res3 = await client.query(insertQuery);
        console.log(res3);
        await client.end();

        res.json(res3);  // Return the data as JSON
    } catch (err) {
        res.status(500).send("Failure");
    }
    
});

// ユーザデータベース内に入っているデータを、チャンネルデータベースに返して表示する
app.get('/get-channels-messages3', async (req, res) => {
    // Dummy Slack messages data
    try {
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
        });
        await client.connect();
        console.log('Connected to Postgres'); // Log message after successful connection
        let insertQuery = `
        SELECT
        m.ts,
        c.channel_alias AS CHANNEL,
        u.user_alias AS USER_ALIAS,
        m.type,
        m.thread_ts,
        m.text
        FROM
            slackdata.allmessages m
        JOIN
            slackdata.allchannels c ON m.channel_id = c.channel_id
        JOIN
            slackdata.allusers u ON m.username = u.username;`;
        const res3 = await client.query(insertQuery);
        console.log(res3);
        await client.end();

        res.json(res3);  // Return the data as JSON
    } catch (err) {
        res.status(500).send("Failure");
    }
    
});

// Update the user's database
app.get('/update-users', async (req, res) => {
    // Dummy Slack messages data
    try {
        const slackUsers = await slackAPI.obtainAllUsers();
        // Update database based on the JSON files obtained, async
        // 環境変数から接続情報を取得
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
        });
        await client.connect();
        console.log('Connected to Postgres'); // Log message after successful connection
        
        const res1 = await client.query(`CREATE SCHEMA IF NOT EXISTS slackdata`);
        console.log("Schema created");
        console.log(res1);

        const res2 = await client.query(`CREATE TABLE IF NOT EXISTS slackdata.allusers (
            username VARCHAR(30) PRIMARY KEY,
            user_alias VARCHAR(300),
            real_name VARCHAR(300)
        )`);
        console.log("Table created");
        console.log(res2);

        // Obtain all users and add to the database
        //const usersList = utils.getAllUsersFromJSON(slackUsers);
        
        let data = [];
        for (let j = 0; j < slackUsers["members"].length; j++) {
            let messageObject = slackUsers["members"][j];
            let user = messageObject["id"];
            let userAlias = messageObject["name"];
            let realName = messageObject["real_name"];
            data.push(`('${user}', '${userAlias}', '${realName}')`);
        }
        
        let insertQuery = `
            INSERT INTO slackdata.allusers (username, user_alias, real_name)
            VALUES ${data.join(',')}
            ON CONFLICT (username)
            DO UPDATE SET
                user_alias = EXCLUDED.user_alias,
                real_name = EXCLUDED.real_name`;

        const res3 = await client.query(insertQuery);
        console.log(res3);
        await client.end();
        res.json(res3);  // Return the data as JSON
    } catch (err) {
        res.status(500).send("Failure");
        console.log(err);
    }
    
});

app.get('/update-database', async (req, res) => {
    // Dummy Slack messages data
    try {
        slackMessages = await slackAPI.getSlackMessages();
        // Update database based on the JSON files obtained, async
        // 環境変数から接続情報を取得
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
        });
        await client.connect();
        console.log('Connected to Postgres'); // Log message after successful connection
        
        const res1 = await client.query(`CREATE SCHEMA IF NOT EXISTS slackdata`);
        console.log("Schema created");
        console.log(res1);

        const res2 = await client.query(`CREATE TABLE IF NOT EXISTS slackdata.allmessages (
            ts NUMERIC(30, 6) PRIMARY KEY,
            client_msg_id VARCHAR(50),
            channel_id VARCHAR(30),
            username VARCHAR(100),
            type VARCHAR(100),
            thread_ts VARCHAR(100),
            text VARCHAR(32767)
        )`);
        console.log("Table created");
        console.log(res2);


        // Extract all channels
        const channelsList = utils.getAllChannelsFromJSON(slackMessages);


        // Create a new table for channels
        const res4 = await client.query(`CREATE TABLE IF NOT EXISTS slackdata.allchannels (
            channel_id VARCHAR(30) PRIMARY KEY,
            channel_alias VARCHAR(300)
        )`);
        console.log("Channel alias created");
        console.log(res4);

        // Create data including all channels to add to the channel database
        let dataC = [];
        for (let i = 0; i < channelsList.length; i++) {
            let channelName = channelsList[i][0];
            let channelAlias = channelsList[i][1];
            dataC.push(`('${channelName}', '${channelAlias}')`);
        }
        
        // Update the database
        let insertQueryC = `
        INSERT INTO slackdata.allchannels (channel_id, channel_alias)
        VALUES ${dataC.join(',')}
        ON CONFLICT (channel_id)
        DO UPDATE SET
            channel_alias = EXCLUDED.channel_alias`;
        const res5 = await client.query(insertQueryC);
        console.log(res5);

        // Create data including all messages to add to the channel database
        // for each channel, extract all messages obtained, adding to the values to be added to the database
        let data = [];
        for (let i = 0; i < channelsList.length; i++) {
            let channelName = channelsList[i][0];
            for (let j = 0; j < slackMessages["allConversationsDict"][channelName].length; j++) {
                let messageObject = slackMessages["allConversationsDict"][channelName][j];
                let ts = messageObject["ts"];
                if (!ts) continue; // ts is the primary key, so the row is not added if null
                let clientMsgId = messageObject["client_msg_id"] ? messageObject["client_msg_id"].replace(/'/g, "''") : "NULL";
                let user = messageObject["user"] ? messageObject["user"].replace(/'/g, "''") : "NULL";
                let type = messageObject["type"] ? messageObject["type"].replace(/'/g, "''") : "NULL";
                let thread_ts = messageObject["thread_ts"] ? messageObject["thread_ts"] : "NULL";
                let text = messageObject["text"] ? messageObject["text"].replace(/'/g, "''") : "";
                data.push(`(${ts}, '${clientMsgId}', '${channelName}', '${user}', '${type}', ${thread_ts}, '${text}')`);
            }
        }
        
        // Update the database
        let insertQuery = `
            INSERT INTO slackdata.allmessages (ts, client_msg_id, channel_id, username, type, thread_ts, text)
            VALUES ${data.join(',')}
            ON CONFLICT (ts)
            DO UPDATE SET
                client_msg_id = EXCLUDED.client_msg_id,
                channel_id = EXCLUDED.channel_id,
                username = EXCLUDED.username,
                type = EXCLUDED.type,
                thread_ts = EXCLUDED.thread_ts,
                text = EXCLUDED.text`;

        const res3 = await client.query(insertQuery);
        console.log(res3);
        await client.end();
        res.json(res3);  // Return the data as JSON
    } catch (err) {
        res.status(500).send("Failure");
        console.log(err);
    }
    
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

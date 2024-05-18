// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
const { WebClient, LogLevel } = require("@slack/web-api");
const fs = require("fs");
// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient(process.env.API_KEY, {
  // LogLevel can be imported and used to make debugging simpler
  //logLevel: LogLevel.DEBUG
});


async function obtainAllUsers() {
    try {
      // Call the conversations.list method using the WebClient
      const result = await client.users.list();
  
      // saveConversations(result.channels);
      return result;
    }
    catch (error) {
      console.error(error);
    }
  }

// You probably want to use a database to store any conversations information ;)
async function obtainConversationStore() {
  try {
    // Call the conversations.list method using the WebClient
    const result = await client.conversations.list();

    // saveConversations(result.channels);
    return result;
  }
  catch (error) {
    console.error(error);
  }
}


async function obtainConversationHistory(channelId, nextCursor) {

    // Store conversation history
    let conversationHistory;
    // ID of channel you watch to fetch the history for

    try {
    // Call the conversations.history method using WebClient
    const result = await client.conversations.history({
        channel: channelId,
        cursor: nextCursor,
        limit: 3
    });

    conversationHistory = result;
    // console.log(result);
    return conversationHistory;
    }
    catch (error) {
    console.error(error);
    }

}

async function obtainAllReplies(channelId, ts) {
    let repliesAll = [];
    let nextCursor = null;
    while (true) {
        let result = await obtainReplies(channelId, ts, nextCursor);
        // The first element is just the thread origin, so it should be omitted
        Array.prototype.push.apply(repliesAll, result["messages"].toSpliced(0, 1).toReversed());
        if (result["has_more"]) {
            nextCursor = result["response_metadata"]["next_cursor"];
        } else {
            break;
        }
    }
    return repliesAll;
}

async function obtainReplies(channelId, ts, nextCursor) {
    let replyHistory;
    // ID of channel you watch to fetch the history for
    try {
    // Call the conversations.history method using WebClient
    const result = await client.conversations.replies({
        channel: channelId,
        ts: ts,
        cursor: nextCursor,
        limit: 3
    });
    replyHistory = result;
    return replyHistory;
    }
    catch (error) {
    console.error(error);
    }
}

// returns the channels list and all conversation messages a server has.
async function getSlackMessages() {
    let allConversationsDict = {};
    let conversationsStore = await obtainConversationStore();
    
    // console.log("conversation store updated", conversationsStore);
    for (const channel of conversationsStore["channels"]) {
        // Obtain all (superficial) messages in the selected channel
        let messagesAll = [];
        let nextCursor = null;
        while (true) {
            let result = await obtainConversationHistory(channel["id"], nextCursor);
            Array.prototype.push.apply(messagesAll, result["messages"]);
            if (result["has_more"]) {
                nextCursor = result["response_metadata"]["next_cursor"];
            } else {
                break;
            }
        }
        
        let historyAll = [];
        // append the replies to any message that has replies
        for (const message of messagesAll) {
            historyAll.push(message); // Array prototype push is an invalid method
            //console.log("a", message, historyAll);
            if (("thread_ts" in message)) {   
                let replies = await obtainAllReplies(channel["id"], message["ts"]);
                Array.prototype.push.apply(historyAll, replies);
            }
            
        }
        
        //console.log(historyAll);
        allConversationsDict[channel["id"]] = historyAll;


    }
    // const jsonString = JSON.stringify(allConversationsDict);
    // fs.writeFile("saved_messages/output.json", jsonString, err => {
    //     if (err) {
    //         console.error("Error writing file: ", err);
    //     } else {
    //         console.log("Successfully wrote JSON to file");
    //     }
    // });

    let answer = {};
    answer.channelList = conversationsStore;
    answer.allConversationsDict = allConversationsDict;
    return answer;

}

if (require.main === module) {
    getSlackMessages();
}

module.exports = {
    getSlackMessages,
    obtainAllUsers,
};

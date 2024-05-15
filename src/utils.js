

function getAllChannelsFromJSON(slackMessages) {
    //console.log("a");
    //console.log(slackMessages);
    //console.log(slackMessages[])
    let channelsJSON = slackMessages["channelList"]["channels"];
    console.log(channelsJSON);
    let answer = [];
    for (let i=0; i<channelsJSON.length; i++) {
        console.log(channelsJSON[i]);
        answer.push([channelsJSON[i]["id"], channelsJSON[i]["name"]]);
    }
    return answer;
}


module.exports = {
    getAllChannelsFromJSON,
};



function getAllChannelsFromJSON(slackMessages) {
    //console.log("a");
    //console.log(slackMessages);
    //console.log(slackMessages[])
    let channelsJSON = slackMessages["channelList"]["channels"];
    //console.log(channelsJSON);
    let answer = [];
    for (let i=0; i<channelsJSON.length; i++) {
        //console.log(channelsJSON[i]);
        answer.push([channelsJSON[i]["id"], channelsJSON[i]["name"]]);
    }
    return answer;
}


function getAllUsersFromJSON(slackUsers) {
    let membersJSON = slackUsers["members"];
    console.log(membersJSON);
    let answer = [];
    for (let i=0; i<membersJSON.length; i++) {
        answer.push([membersJSON[i]["id"], membersJSON[i]["name"], membersJSON[i]["real_name"]]);
    }
    return answer;
}

module.exports = {
    getAllChannelsFromJSON,
    getAllUsersFromJSON,
};

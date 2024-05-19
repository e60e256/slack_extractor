

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


function convertToTimestamp(dateStr) {
    const dateParts = dateStr.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // JavaScript months are 0-11
    const day = parseInt(dateParts[2], 10);
    
    const date = new Date(Date.UTC(0, month, day));
    date.setUTCFullYear(year); // Set the year separately to handle large years
    date.setUTCHours(date.getUTCHours() + 9); // In Japan

    // Format the timestamp with 6-digit precision under the decimal point
    const timestamp = date.toISOString().replace('T', ' ').replace('Z', '');
    return `${timestamp}.000000`;
}

function convertToUnixTimestamp(dateStr) {
    const dateParts = dateStr.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // JavaScript months are 0-11
    const day = parseInt(dateParts[2], 10);
    
    // Create a Date object in UTC
    const date = new Date(Date.UTC(year, month, day));

    // Adjust for Japan Standard Time (UTC+9)
    const jstOffset = 9 * 60 * 60 * 1000; // 9 hours in milliseconds
    const jstDate = new Date(date.getTime() + jstOffset);

    // Convert to Unix Timestamp
    const unixTimestamp = jstDate.getTime() / 1000; // convert from milliseconds to seconds

    // Ensure 6 digit precision under the decimal point
    const unixTimestampWithPrecision = unixTimestamp.toFixed(6);

    return unixTimestampWithPrecision;
}

module.exports = {
    getAllChannelsFromJSON,
    getAllUsersFromJSON,
    convertToTimestamp,
    convertToUnixTimestamp
};

 // Sample data (replace with actual data from the server)


// Function to fetch Slack messages from the server
async function fetchSlackMessages() {
    try {
        const response = await fetch('/get-channels-messages3');
        if (response.ok) {
            const messages = await response.json();
            // Display the messages in the text area
            const messagesJSON = JSON.stringify(messages, null, 2);
            document.getElementById('slack-messages').value = messagesJSON;
            populateTable(messages["rows"]);
        } else {
            console.error('Failed to fetch Slack messages');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to fetch Slack messages from the server
async function fetchChannelsList() {
    try {
        const response = await fetch('/get-all-channels');
        if (response.ok) {
            const messages = await response.json();
            // Display the messages in the text area
            document.getElementById('slack-messages').value = JSON.stringify(messages, null, 2);
            populateTableChannels(messages["rows"]);
        } else {
            console.error('Failed to fetch Slack messages');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to fetch Slack messages from the server
async function updateDatabase() {
    try {
        const response = await fetch('/update-database');
        if (response.ok) {
            const messages = await response.json();
            console.log("Successfully updated channels/message database");
        } else {
            console.error('Failed to update channels/message database');
        }
    } catch (error) {
        console.error('Error:', error);
    }

    try {
        const response = await fetch('/update-users');
        if (response.ok) {
            const messages = await response.json();
            console.log("Successfully updated user database");
        } else {
            console.error('Failed to update user database');
        }
    } catch (error) {
        console.error('Error:', error);
    }

    alert("Finished Updating database");
}

async function searchQuery() {
        let channel = document.getElementById('channel').value;
        let afterDate = document.getElementById('afterDate').value;
        let beforeDate = document.getElementById('beforeDate').value;

        if (!channel) {
            channel = 'ALL';
        }
        if (!afterDate) {
            afterDate = '1-1-1';
        }
        if (!beforeDate) {
            beforeDate = '3000-12-31';
        }

        const searchParams = {
            channel: channel,
            after: afterDate,
            before: beforeDate,
        };
        console.log(searchParams);
        if (afterDate && beforeDate) {
            // ここで、指定された期間を使用して検索機能を実行します
            // 例えば、検索結果をフィルタリングするAPIを呼び出すなど
            const response = await fetch('/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(searchParams)
            });

            if (response.ok) {
                const messages = await response.json();
                // Display the messages in the text area
                const messagesJSON = JSON.stringify(messages, null, 2);
                document.getElementById('slack-messages').value = messagesJSON;
                populateTable(messages["rows"]);
            } else {
                console.error('Failed to fetch Slack messages');
            }

        } else {
            alert('Make sure to input both starting and ending dates');
        }
}


function formatTimestamp(ts) {
    const date = new Date(parseFloat(ts) * 1000);
    return date.toLocaleString('ja-JP', {
        timeZone: 'Asia/Tokyo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// Update the table
function populateTable(data) {
    const thead = document.querySelector('#messageTable thead');
    thead.innerHTML = `    
    <tr>
    <th>TIME</th>
    <th>Channel</th>
    <th>From user</th>
    <th>Text</th>
    </tr>`;

    const tbody = document.querySelector('#messageTable tbody');
    tbody.innerHTML = '';

    data.forEach(row => {
        const tr = document.createElement('tr');

        const tdTime = document.createElement('td');
        tdTime.textContent = formatTimestamp(row.ts);
        tr.appendChild(tdTime);

        const tdChannel = document.createElement('td');
        tdChannel.textContent = row.channel;
        tr.appendChild(tdChannel);

        const tdUser = document.createElement('td');
        tdUser.textContent = row.user_alias;
        tr.appendChild(tdUser);

        const tdText = document.createElement('td');
        tdText.textContent = row.text;
        tr.appendChild(tdText);

        tbody.appendChild(tr);
    });
}

function populateTableChannels(data) {
    const thead = document.querySelector('#messageTable2 thead');
    thead.innerHTML = `    
    <tr>
    <th>Channel ID</th>
    <th>Channel Alias</th>
    </tr>`;

    const tbody = document.querySelector('#messageTable2 tbody');
    tbody.innerHTML = '';
    console.log(data);
    data.forEach(row => {
        console.log(row);
        const tr = document.createElement('tr');

        const tdTime = document.createElement('td');
        tdTime.textContent = row["channel_id"];
        tr.appendChild(tdTime);

        const tdChannel = document.createElement('td');
        tdChannel.textContent = row["channel_alias"];
        tr.appendChild(tdChannel);

        tbody.appendChild(tr);
    });
}

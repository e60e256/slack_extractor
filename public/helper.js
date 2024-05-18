 // Sample data (replace with actual data from the server)
 const data = [
    {
        "ts": "1713195656.451729",
        "channel": "rpg",
        "user_alias": "e60e256",
        "text": "Only the legend tells his story"
    },
    {
        "ts": "1713195638.293069",
        "channel": "rpg",
        "user_alias": "e60e256",
        "text": "The symbol finally breaks down"
    },
    {
        "ts": "1713195630.820599",
        "channel": "rpg",
        "user_alias": "e60e256",
        "text": "He grows old to die"
    }
];

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

function populateTable(data) {
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

// Populate the table with data
populateTable(data);



The response to conversations.list
```json
{
    "ok": true,
    "channels": [
        {
            "id": "C06UB7PDWCA",
            "name": "general",
            "is_channel": true,
            "is_group": false,
            "is_im": false,
            "is_mpim": false,
            "is_private": false,
            "created": 1713184766,
            "is_archived": false,
            "is_general": true,
            "unlinked": 0,
            "name_normalized": "general",
            "is_shared": false,
            "is_org_shared": false,
            "is_pending_ext_shared": false,
            "pending_shared": [],
            "context_team_id": "T06UDMBD51S",
            "updated": 1713184766420,
            "parent_conversation": null,
            "creator": "U06UB7PC4KU",
            "is_ext_shared": false,
            "shared_team_ids": [
                "T06UDMBD51S"
            ],
            "pending_connected_team_ids": [],
            "is_member": false,
            "topic": {
                "value": "",
                "creator": "",
                "last_set": 0
            },
            "purpose": {
                "value": "このチャンネルには、常にすべてのメンバーが含まれます。社内通知やチーム全体の会話にぴったりです。",
                "creator": "U06UB7PC4KU",
                "last_set": 1713184766
            },
            "properties": {
                "use_case": "welcome"
            },
            "previous_names": [],
            "num_members": 1
        },
        {
            "id": "C06UDMGHGDA",
            "name": "slack-extractor",
            "is_channel": true,
            "is_group": false,
            "is_im": false,
            "is_mpim": false,
            "is_private": false,
            "created": 1713184824,
            "is_archived": false,
            "is_general": false,
            "unlinked": 0,
            "name_normalized": "slack-extractor",
            "is_shared": false,
            "is_org_shared": false,
            "is_pending_ext_shared": false,
            "pending_shared": [],
            "context_team_id": "T06UDMBD51S",
            "updated": 1713184824102,
            "parent_conversation": null,
            "creator": "U06UB7PC4KU",
            "is_ext_shared": false,
            "shared_team_ids": [
                "T06UDMBD51S"
            ],
            "pending_connected_team_ids": [],
            "is_member": false,
            "topic": {
                "value": "",
                "creator": "",
                "last_set": 0
            },
            "purpose": {
                "value": "このチャンネルでは #slack-extractor についてどんなことでも話し合えます。ミーティングの開催、資料の共有、チーム一体での意思決定ができます。",
                "creator": "U06UB7PC4KU",
                "last_set": 1713184824
            },
            "properties": {
                "use_case": "project"
            },
            "previous_names": [],
            "num_members": 1
        },
        {
            "id": "C06V01G1LAC",
            "name": "random",
            "is_channel": true,
            "is_group": false,
            "is_im": false,
            "is_mpim": false,
            "is_private": false,
            "created": 1713184766,
            "is_archived": false,
            "is_general": false,
            "unlinked": 0,
            "name_normalized": "random",
            "is_shared": false,
            "is_org_shared": false,
            "is_pending_ext_shared": false,
            "pending_shared": [],
            "context_team_id": "T06UDMBD51S",
            "updated": 1713184766634,
            "parent_conversation": null,
            "creator": "U06UB7PC4KU",
            "is_ext_shared": false,
            "shared_team_ids": [
                "T06UDMBD51S"
            ],
            "pending_connected_team_ids": [],
            "is_member": false,
            "topic": {
                "value": "",
                "creator": "",
                "last_set": 0
            },
            "purpose": {
                "value": "このチャンネルでは、どんなことでも話せます。チーム内のジョークや、とっさに思い付いたアイデア、おもしろい GIF 画像を投稿できます。思いのままに活用しましょう！",
                "creator": "U06UB7PC4KU",
                "last_set": 1713184766
            },
            "properties": {
                "use_case": "random"
            },
            "previous_names": [],
            "num_members": 1
        }
    ],
    "response_metadata": {
        "next_cursor": ""
    }
}
```

Response to conversations.history


```json

{
    "ok": true,
    "messages": [
        {
            "subtype": "channel_join",
            "user": "U06UB7PC4KU",
            "text": "<@U06UB7PC4KU>さんがチャンネルに参加しました",
            "type": "message",
            "ts": "1713184824.200469"
        }
    ],
    "has_more": false,
    "pin_count": 0,
    "channel_actions_ts": null,
    "channel_actions_count": 0
}

```

Response to conversations.replies

```json
{
    "ok": true,
    "messages": [
        {
            "user": "U06UB7PC4KU",
            "type": "message",
            "ts": "1713191066.806699",
            "client_msg_id": "65b1d1be-af6b-46ca-bcb8-bd0df7936e7a",
            "text": "Hi",
            "team": "T06UDMBD51S",
            "thread_ts": "1713191066.806699",
            "reply_count": 9,
            "reply_users_count": 1,
            "latest_reply": "1713191184.656979",
            "reply_users": [
                "U06UB7PC4KU"
            ],
            "is_locked": false,
            "subscribed": true,
            "last_read": "1713191184.656979",
            "blocks": [
                {
                    "type": "rich_text",
                    "block_id": "bnCY8",
                    "elements": [
                        {
                            "type": "rich_text_section",
                            "elements": [
                                {
                                    "type": "text",
                                    "text": "Hi"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "user": "U06UB7PC4KU",
            "type": "message",
            "ts": "1713191137.889449",
            "client_msg_id": "5dcb2e59-c7fc-4884-ab40-b87536b85f4e",
            "text": "egp",
            "team": "T06UDMBD51S",
            "thread_ts": "1713191066.806699",
            "parent_user_id": "U06UB7PC4KU",
            "blocks": [
                {
                    "type": "rich_text",
                    "block_id": "NziFO",
                    "elements": [
                        {
                            "type": "rich_text_section",
                            "elements": [
                                {
                                    "type": "text",
                                    "text": "egp"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "user": "U06UB7PC4KU",
            "type": "message",
            "ts": "1713191142.271529",
            "client_msg_id": "dc1bff46-4cfe-4a5e-a67b-a4add84de8ac",
            "text": "port",
            "team": "T06UDMBD51S",
            "thread_ts": "1713191066.806699",
            "parent_user_id": "U06UB7PC4KU",
            "blocks": [
                {
                    "type": "rich_text",
                    "block_id": "ynbLF",
                    "elements": [
                        {
                            "type": "rich_text_section",
                            "elements": [
                                {
                                    "type": "text",
                                    "text": "port"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "user": "U06UB7PC4KU",
            "type": "message",
            "ts": "1713191150.906119",
            "client_msg_id": "c0e7f2ab-a23b-4e8c-94d9-b761ae932e32",
            "text": "tty",
            "team": "T06UDMBD51S",
            "thread_ts": "1713191066.806699",
            "parent_user_id": "U06UB7PC4KU",
            "blocks": [
                {
                    "type": "rich_text",
                    "block_id": "O1LkQ",
                    "elements": [
                        {
                            "type": "rich_text_section",
                            "elements": [
                                {
                                    "type": "text",
                                    "text": "tty"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "user": "U06UB7PC4KU",
            "type": "message",
            "ts": "1713191184.656979",
            "client_msg_id": "21ed3e74-eb3e-4c89-bf3d-444cc6343f8c",
            "text": "------",
            "team": "T06UDMBD51S",
            "thread_ts": "1713191066.806699",
            "parent_user_id": "U06UB7PC4KU",
            "blocks": [
                {
                    "type": "rich_text",
                    "block_id": "FYIQT",
                    "elements": [
                        {
                            "type": "rich_text_section",
                            "elements": [
                                {
                                    "type": "text",
                                    "text": "------"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    "has_more": true,
    "response_metadata": {
        "next_cursor": "bmV4dF90czoxNzEzMTkxMTA1ODE4Mjg5"
    }
}
```

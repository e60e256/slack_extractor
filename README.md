# Slack Extractor
Slack のメッセージをAPI経由でデータベースに蓄えて、表示する機能を持つサービス。
無料版で3か月制限を乗り越えたいために開発した。

## 必要条件
- Docker 24.0 以降
- node.js 20.0 以降

## 使用開始方法
1. このレポジトリをクローンして、ルートディレクトリに移動する。
```bash
git clone git@github.com:e60e256/slack_extractor.git
cd slack_extractor
```

2. `.env` ファイルを作成し、次を入力する。

```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=mydatabase
API_KEY=xoxp-your-slack-api-key-here
```

3. docker compose up すると起動する。
その状態で ウェブブラウザから localhost:3000 にアクセスすると画面が開く。

```bash
docker compose up --build
```

4. 起動したら、まず最初に「Update database」を押す。これをしないとテーブルが作成されない。

5. 設定完了。なお、データベースは docker volume として永続化されているので、
docker compose down しても消えない。コマンドの詳細は「サーバのエンドポイント」の章を参照。

### 停止方法

```bash
docker compose stop # 停止
docker compose start # 再開
```

### データベースボリュームの削除
- これを行うと保存された全チャンネル・メッセージデータが消去されるので注意

```bash
docker volume ls # slack_extractor_db-data のようなボリュームをみつける
docker volume rm docker-volume-name-here_db-data
```

## サーバのエンドポイント
サーバの役割は以下の通り:
- APIキーを持ち、特定ワークスペースからメッセージを読み、データベースに渡す
- データベースからの情報をクライアントに渡す

### /update-database
データベースの中身 (チャンネル名, メッセージ) を更新するクエリ。
更新時の仕様で重要なものはこちら
- 新しく来たデータを1件1件データベースに書き込む。既にデータがある場合でも更新する
- Slack側で削除されていても、削除しない (3か月以前のデータは閲覧不可能なため)

### /update-users
ユーザ名のデータベースを更新するクエリ

### /get-all-channels
全チャンネル名とそのIDを表示するクエリ。 
`Fetch Channels List` で呼び出せる

### /get-all-messages3
全メッセージを取得するクエリ
`Fetch ALL Slack Messages` で呼び出せる

### /search
指定されたメッセージを取得するクエリ。
POSTリクエストで取得する。
`SEARCH` を押すと呼び出される

入れられるパラメータは以下の通り
`channel`: 指定されたチャンネル名からのみのメッセージを取得する。「ALL」を指定すると全チャンネルから取得する。
`after`: `yyyy-mm-dd` の形で取得し、この日付以降のメッセージのみを取得する
`before`: `yyyy-mm-dd` の形で取得し、この日付以前のメッセージのみを取得する

パラメータ例
```json
{
    "channel": "general",
    "after": "2024-05-01",
    "before": "2024-05-20"
}
```

## データベースの役割

データベース構造:
- メッセージ名データベース: 
```sql
slackdata.allmessages (
            ts NUMERIC(30, 6) PRIMARY KEY,
            client_msg_id VARCHAR(50),
            channel_id VARCHAR(30),
            username VARCHAR(100),
            type VARCHAR(100),
            thread_ts VARCHAR(100),
            text VARCHAR(32767)
        )
```

- チャンネル名データベース:
```sql
slackdata.allchannels (
            channel_id VARCHAR(30) PRIMARY KEY,
            channel_alias VARCHAR(300)
        )
```

- ユーザ名データベース: [username, user_alias, real_name]
```sql
slackdata.allusers (
            username VARCHAR(30) PRIMARY KEY,
            user_alias VARCHAR(300),
            real_name VARCHAR(300)
        )
```


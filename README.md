# Slack Extractor
Extract slack messages from a server on demand.


## フロントの表示
それぞれのクエリに対応する簡素なボタンを設置し、押したら発令するようにする
結果はメッセージボックスに JSON をそのままの形で表示する

## サーバの役割
- APIキーを持ち、特定ワークスペースからメッセージを読み、データベースに渡す
- データベースからの情報をクライアントに渡す

### /update-database
データベースの中身を更新するクエリ
- 時間制限 1回/1分

### /get-all-channels
全チャンネル名とその詳細を表示するクエリ
- 時間制限 1回/1分

### /get-all-messages
全メッセージデータベースを取得するクエリ
- 時間制限 1回/1分

### /search
POSTクエリで、指定された条件でデータベースから取得する
- 検索できる内容
    - チャンネル
    - before/after
    - LIMIT
    - 指定語句
    - 発信者
- 時間制限 1回/1分

## データベースの役割

データベース構造:
- メッセージ名データベース: [message_id (キー), channel_name, username, type, ts, thread_ts, text]
- チャンネル名データベース: [channel_name (キー), channel_alias, purpose_value]
- ユーザ名データベース: [username, user_alias, real_name]

更新時:
- 新しく来たデータを1件1件データベースに書き込む。既にデータがある場合でも更新する
- 削除されたデータでも、削除しない (3か月以前のデータは閲覧不可能なため)

抽出操作:
- 特定のチャンネルのメッセージを全て抽出
- 特定時間帯のメッセージを全て抽出
- 語彙検索 (SQLインジェクション避けも実施)

データの保存:
- 展開を容易にするため Docker image で構築したい (Postgres 16 bookworm)
- しかし、プロセスが切れても永続化したい 
    - local にデータを保存したい
    - データベースファイルを作成する


## Docker 化
- 以下のコンテナを用意
    - Node.js を実行するサーバ用コンテナ (クライアント用サイトも提供)
    - Postgres でデータを保存するデータベース用コンテナ

## 知りたいこと・メモ
- Docker のネットワーク周り
    - Node.js において、Postgres にアクセスする方法
        - 特に、Dockerコンテナとして別のIPaddrに存在する場合はどうするか？
        - Postgres の開放ポート番号
- ローカルにデータベースファイルを保存する方法
- Node.js から Postgres の内容を書き換える方法
- Postgres にパスワードを設定しよう (外部から勝手に書き換えられたくない)
    - サーバマシンだけがわかるようにする
        - どうやってサーバ起動時に環境変数 (Slack APIキー, Postgres ID/passwd) をバレないように指定する？


Docker compose up したら、データベースを読み込み。なければ 新しく CREATE する

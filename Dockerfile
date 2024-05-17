# ベースイメージ
FROM node:20

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースをコピー
COPY . .

# アプリケーションをビルド（必要な場合）
# RUN npm run build

# アプリケーションを起動
CMD [ "npm", "start"]

# Node.jsサーバがリッスンするポートを開放
EXPOSE 3000
## 

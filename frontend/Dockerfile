# ベースイメージを指定
FROM node:14

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係のファイルをコピー
COPY package.json ./
COPY package-lock.json ./

# 依存関係をインストール
RUN npm install

# ソースコードをコピー
COPY . .

# ポートを開放
EXPOSE 3000

# アプリケーションを起動
CMD ["npm", "start"]
# GitHub Pages で公開する手順

このフォルダは **リポジトリのルート** にそのまま置く想定です（`index.html` がルートにある）。

公開URLの例: `https://あなたのユーザー名.github.io/リポジトリ名/`

## 1. GitHub にリポジトリを作る

1. [GitHub](https://github.com) にログイン → **New repository**
2. 名前を決める（例: `legal-rpg`）
3. **Public** を選ぶ（無料の GitHub Pages で公開しやすい）
4. **Create repository**

## 2. ファイルを push する

初回は次のような流れ（PCに Git が入っている前提）。

```powershell
cd "C:\Users\akita\OneDrive\ドキュメント\仕事\legal-rpg"
git init
git add README.md DEPLOY.md index.html app.js style.css questions.json
git commit -m "Add legal-rpg static site"
git branch -M main
git remote add origin https://github.com/あなたのユーザー名/リポジトリ名.git
git push -u origin main
```

GitHub の Web サイトから **Upload files** しても構いません。

## 3. GitHub Pages を有効にする

1. リポジトリの **Settings** → 左メニュー **Pages**
2. **Build and deployment**
   - **Branch**: `main` を選ぶ
   - **Folder**: `/ (root)` を選ぶ
3. **Save**

数分待つと、**Settings → Pages** に表示される **URL**（例: `https://xxx.github.io/legal-rpg/`）で開けます。

## 4. 動作確認

- ブラウザで `https://あなたのユーザー名.github.io/リポジトリ名/` を開く
- ゲームが表示され、`questions.json` が読み込めればOK

## 注意

- 社外に出してよい内容か（問題文・社名・機密）を確認してください。
- 更新したら `git push` 後、反映まで **1〜2分** かかることがあります。

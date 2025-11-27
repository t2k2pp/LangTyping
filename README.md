# Code Typing Master - タイピング学習アプリ

プログラミング言語とタイピングを同時に学べる、モダンなWebベースの学習アプリケーションです。

![Code Typing Master](https://img.shields.io/badge/language-JavaScript-yellow)
![Code Typing Master](https://img.shields.io/badge/license-MIT-blue)

## 🎯 特徴

- **19のプログラミング言語に対応**: JavaScript, React, Node.js, C, C++, C#, Rust, SQL, COBOL, Shell, JSON, XML, YAML, CSV, TOML, PowerShell, DOSなど
- **3段階の難易度**: Easy（50-100文字）、Medium（100-250文字）、Hard（250-500文字）
- **ソフトウェアキーボード表示**: タイプしたキーがリアルタイムでハイライト表示され、誤タイプに気づきやすい
- **VS Code風のエディター**: コードエディターのような美しいUIでタイピング練習
- **正確性重視のスコアリング**: 速さよりも正確性を重視した評価システム
- **リアルタイム統計**: 正確性、CPM、誤タイプ数をリアルタイムで表示

## 🚀 使い方

### インストール不要！

このアプリケーションは純粋なHTML/CSS/JavaScriptで作られているため、インストール不要です。

1. リポジトリをクローンまたはダウンロード
```bash
git clone https://github.com/t2k2pp/LangTyping.git
cd LangTyping
```

2. ブラウザで `index.html` を開く
```bash
# Windowsの場合
start index.html

# macOS/Linuxの場合
open index.html
```

### 使用方法

1. **言語を選択**: ドロップダウンから学習したいプログラミング言語を選択
2. **難易度を選択**: Easy / Medium / Hard から選択
3. **スタートボタンをクリック**: タイピングセッション開始
4. **コードをタイプ**: 表示されたコードを正確にタイプ
5. **結果を確認**: 完了後、スコア、ランク、統計情報が表示されます

## 📊 スコアリングシステム

スコア計算式:
```
Score = Accuracy² × CPM × Difficulty Multiplier
```

- **Accuracy（正確性）**: 正しくタイプした文字の割合（二乗でペナルティ強化）
- **CPM**: Characters Per Minute（1分あたりの文字数）
- **Difficulty Multiplier**: Easy=1.0x, Medium=1.5x, Hard=2.0x

### ランク評価
- **S**: 500点以上（正確性90%以上）
- **A**: 350点以上（正確性90%以上）
- **B**: 200点以上（正確性90%以上）
- **C**: 正確性80%以上
- **D**: 正確性80%未満

## 🛠️ 技術スタック

- **HTML5**: セマンティックなマークアップ
- **CSS3**: カスタムプロパティ、グラデーション、アニメーション
- **Vanilla JavaScript**: フレームワーク不要のピュアなJavaScript
- **Google Fonts**: Inter（UI）、JetBrains Mono（コード）

## 📁 ファイル構成

```
LangTyping/
├── index.html          # メインHTMLファイル
├── style.css           # スタイルシート
├── app.js              # アプリケーション制御
├── keyboard.js         # ソフトウェアキーボード
├── typing-engine.js    # タイピングエンジン
├── scoring.js          # スコアリングシステム
├── samples.js          # コードサンプルデータベース
└── README.md           # このファイル
```

## 🎨 デザイン

- **VS Code風のダークテーマ**: プログラマーに馴染みのあるデザイン
- **モダンなグラデーション**: 美しいビジュアル効果
- **スムーズなアニメーション**: キー押下、画面遷移など
- **レスポンシブデザイン**: モバイルデバイスにも対応

## 🌐 対応ブラウザ

- Chrome（推奨）
- Firefox
- Safari
- Edge

## 📝 ライセンス

MIT License

## 🤝 コントリビューション

プルリクエスト、イシュー、フィードバックを歓迎します！

## 🔗 リンク

- [GitHub Repository](https://github.com/t2k2pp/LangTyping)

---

**Happy Typing! 🎉**

# 🎯 Code Typing Master

プログラミング言語とタイピングスキルを同時に向上させる学習アプリケーション

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow.svg)

## ✨ 特徴

- 📚 **多言語対応**: JavaScript、C言語、その他19言語をサポート
- 🎮 **ステージシステム**: 段階的に学べる豊富なコンテンツ
- 🏆 **ハイスコア管理**: ステージごとにベストスコアを記録
- ⌨️ **リアルタイムフィードバック**: タイピング速度と正確性を即座に表示
- 🎨 **モダンなUI**: VSCode風のダークテーマ
- 📱 **レスポンシブデザイン**: モバイルからデスクトップまで対応

## 🚀 クイックスタート

### 必要要件

- モダンなWebブラウザ (Chrome, Firefox, Safari, Edge)
- ローカルサーバー (開発時)

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/t2k2pp/LangTyping.git

# ディレクトリに移動
cd LangTyping

# ローカルサーバーで起動
# Python 3の場合
python -m http.server 8000

# または Node.jsの場合
npx serve
```

ブラウザで `http://localhost:8000` にアクセス

## 📁 プロジェクト構造

```
LangTyping/
├── index.html          # メインHTML
├── style.css           # スタイルシート
├── app.js             # アプリケーションコントローラー
├── stages.js          # ステージデータローダー
├── keyboard.js        # ソフトウェアキーボード
├── typing-engine.js   # タイピングエンジン
├── scoring.js         # スコアリングシステム
├── samples.js         # レガシーコードサンプル
└── stages/            # ステージデータ（JSON）
    ├── javascript/
    │   ├── easy/
    │   │   ├── stage-00-01.json  # 予約語
    │   │   ├── stage-01-01.json  # Hello World
    │   │   ├── stage-01-02.json  # 変数
    │   │   └── ...
    │   ├── medium/
    │   └── hard/
    └── c/
        ├── easy/
        ├── medium/
        └── hard/
```

## 🎮 使い方

### 基本的な流れ

1. **言語を選択**: JavaScript、C言語など
2. **難易度を選択**: Easy、Medium、Hard
3. **モードを選択**:
   - **ランダムモード**: 難易度内でランダムなステージ
   - **ステージ選択モード**: 個別にステージを選ぶ
4. **タイピング開始**: 表示されたコードを正確に入力
5. **結果を確認**: スコア、正確性、速度を表示

### スコアリング

スコアは以下の要素で計算されます：

- **正確性**: 正しく入力した文字の割合
- **速度**: CPM (Characters Per Minute)
- **難易度**: Easy (1.0x), Medium (1.5x), Hard (2.0x)

ランク判定：
- **S**: 95%以上の正確性
- **A**: 85%以上
- **B**: 75%以上
- **C**: 65%以上
- **D**: それ以下

## 📚 ステージシステム

### データ構造

各ステージはJSONファイルとして管理されています：

```json
{
  "id": "1-1",
  "level": 1,
  "title": "🎯 Hello World！JavaScriptの第一歩",
  "description": "説明文...",
  "code": "console.log(\"Hello, World!\");",
  "story": null
}
```

### ステージの追加方法

1. 適切なディレクトリに移動:
   ```
   stages/[language]/[difficulty]/
   ```

2. 新しいJSONファイルを作成:
   ```
   stage-XX-XX.json
   ```

3. ステージ情報を記述

4. `stages.js`の`getStageFileList`にファイル名を追加

## 🔧 開発

### 技術スタック

- **HTML5**: セマンティックマークアップ
- **CSS3**: Flexbox, Grid, Custom Properties
- **JavaScript ES6+**: Async/Await, Modules, Classes

### 主要コンポーネント

#### App (app.js)
- アプリケーション全体の制御
- 画面遷移管理
- イベントハンドリング

#### StageDatabase (stages.js)
- JSONファイルからステージデータを読み込み
- キャッシュ機能
- 非同期データ取得

#### TypingEngine (typing-engine.js)
- キー入力の検証
- 進捗管理
- コードレンダリング

#### SoftwareKeyboard (keyboard.js)
- ソフトウェアキーボードの表示
- Shift/CapsLock対応
- 日本語配列サポート

#### ScoringSystem (scoring.js)
- スコア計算
- ランク判定
- 統計情報

### カスタマイズ

#### 新しい言語を追加

1. `stages/[new-language]/`ディレクトリを作成
2. `easy/`, `medium/`, `hard/`サブディレクトリを作成
3. ステージJSONファイルを追加
4. `app.js`の`getFileExtension`にファイル拡張子を追加

#### テーマのカスタマイズ

`style.css`の`:root`セクションでカラーパレットを変更：

```css
:root {
    --color-bg-primary: #1e1e1e;
    --color-accent-primary: #007acc;
    /* ... */
}
```

## 🤝 コントリビューション

プルリクエスト大歓迎！

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

### ステージの追加

新しいステージを追加したい場合：
- `stages/`ディレクトリに適切なJSONファイルを追加
- プルリクエストを送信

## 📝 ライセンス

MIT License - 詳細は[LICENSE](LICENSE)ファイルを参照

## 👤 作成者

**t2k2pp**  
GitHub: [@t2k2pp](https://github.com/t2k2pp)

## 🙏 謝辞

- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) - コードフォント
- [Google Fonts](https://fonts.google.com/) - UIフォント

## 📮 連絡先

質問や提案がある場合は、GitHubのIssuesでお願いします。

---

⭐ このプロジェクトが役に立ったら、スターをお願いします！

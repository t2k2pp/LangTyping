# Code Typing Master - 開発TODO

## ✅ 完成した機能

### ステージシステム
- [x] JavaScript: 16ステージ (easy:7, medium:4, hard:5)
- [x] Python: 16ステージ (easy:7, medium:4, hard:5)
- [x] C: 4ステージ (easy:4)
- [x] 自動ファイル検出システム
- [x] ハイスコア管理
- [x] プレビュー画面
- [x] ステージ選択画面

### UI/UX
- [x] モダンなダークテーマ
- [x] レスポンシブデザイン
- [x] ソフトウェアキーボード（Shift対応）
- [x] リアルタイムフィードバック

## 🔧 手動で修正が必要な項目

### 1. index.htmlにPythonを追加

`index.html` の33-37行目を以下のように変更：
```html
<select id="language-select" class="select-input">
    <option value="javascript" selected>JavaScript</option>
    <option value="python">Python 🐍</option>
    <option value="c">C Language</option>
    <option value="english">English - 英語</option>
</select>
```

### 2. app.jsにPython拡張子を追加

`app.js` の239-249行目の`getFileExtension`関数を以下のように変更：
```javascript
getFileExtension(lang) {
    const extensions = {
        javascript: 'js', react: 'jsx', nodejs: 'js',
        python: 'py',  // ← この行を追加
        c: 'c', cpp: 'cpp', csharp: 'cs',
        rust: 'rs', sql: 'sql', cobol: 'cob',
        bash: 'sh', cshell: 'csh',
        json: 'json', xml: 'xml', yaml: 'yml',
        csv: 'csv', toml: 'toml',
        dos: 'bat', powershell: 'ps1',
        english: 'txt'
    };
    return extensions[lang] || 'txt';
},
```

## 📋 今後の追加予定

### C言語の拡張
- [ ] C medium: 4ステージ
- [ ] C hard: 5ステージ

### 新しい言語
- [ ] Rust: easy/medium/hard
- [ ] SQL: easy/medium/hard
- [ ] TypeScript: easy/medium/hard
- [ ] Go: easy/medium/hard

### 機能追加
- [ ] タイムアタックモード
- [ ] ランキングシステム
- [ ] 実績システム
- [ ] カスタムステージ作成機能
- [ ] ステージのインポート/エクスポート

## 🎯 使い方

1. ローカルサーバーを起動:
   ```bash
   python -m http.server 8000
   ```

2. ブラウザで開く:
   ```
   http://localhost:8000
   ```

3. 言語と難易度を選択してスタート！

## 📦 ファイル構造

```
stages/
├── javascript/ (16 files)
├── python/ (16 files)
└── c/ (4 files)
```

新しいステージを追加するには、`stage-XX-XX.json`形式でファイルを作成するだけです！

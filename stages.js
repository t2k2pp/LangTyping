// Stage-based Code Samples Database
const StageDatabase = {
    javascript: {
        easy: {
            stages: [
                {
                    id: '1-1',
                    level: 1,
                    title: '🎯 Hello World！JavaScriptの第一歩',
                    description: 'さあ、JavaScriptの世界へようこそ！✨\n最初のお題はプログラミングの定番、Hello World！コンソールにメッセージを表示するシンプルなコードです。\nこれがあなたのJavaScript人生の始まりです！Let\'s Try! 💪',
                    code: 'console.log("Hello, World!");',
                    story: null
                },
                {
                    id: '1-2',
                    level: 1,
                    title: '📝 変数の宣言 - データを保存しよう',
                    description: 'すごい！Hello Worldができました！🎉\n次は変数の使い方を学びましょう。変数はデータを保存する箱のようなもの。\nconst、let、varの3つの方法があります。頑張って！🚀',
                    code: 'const name = "JavaScript";\nlet version = 2024;\nvar isAwesome = true;',
                    story: null
                },
                {
                    id: '1-3',
                    level: 1,
                    title: '➕ 簡単な計算をしてみよう',
                    description: 'いい調子です！👏\nJavaScriptは計算も得意です。足し算、引き算、掛け算、割り算…なんでもできます！\n変数を使った計算をマスターしましょう！💯',
                    code: 'const a = 10;\nconst b = 5;\nconst sum = a + b;\nconsole.log(sum);',
                    story: null
                },
                {
                    id: '2-1',
                    level: 2,
                    title: '🔄 関数を作ろう - コードの再利用',
                    description: '基本はバッチリですね！✨\nさあ、次のステップは関数です。関数を使えば、同じコードを何度も書く必要がなくなります。\n効率的なプログラミングの第一歩です！頑張りましょう！🎯',
                    code: 'function greet(name) {\n    return "Hello, " + name + "!";\n}\n\nconst message = greet("World");',
                    story: null
                },
                {
                    id: '2-2',
                    level: 2,
                    title: '🎯 アロー関数 - モダンなスタイル',
                    description: 'すごい！関数が書けるようになりました！🎊\n今度はES6で追加されたアロー関数に挑戦です。\nより短く、読みやすいコードが書けるようになります！Cool! 😎',
                    code: 'const sum = (a, b) => a + b;\nconst square = x => x * x;\n\nconsole.log(sum(3, 4));',
                    story: null
                },
                {
                    id: '2-3',
                    level: 2,
                    title: '📦 配列の基本 - データをまとめよう',
                    description: '順調に進んでいますね！素晴らしい！🌟\n配列を使えば、複数のデータを一つにまとめて管理できます。\nプログラミングの幅がグッと広がりますよ！Let\'s Go! 🚀',
                    code: 'const fruits = ["apple", "banana", "orange"];\nconsole.log(fruits[0]);\nconsole.log(fruits.length);',
                    story: null
                }
            ]
        },
        medium: {
            stages: [
                {
                    id: '3-1',
                    level: 3,
                    title: '🔁 for文でループ処理',
                    description: 'いよいよ中級編です！💪 頑張りましょう！\nループ処理を使えば、同じ処理を繰り返すことができます。\nプログラミングの基本中の基本。しっかりマスターしましょう！✨',
                    code: 'for (let i = 0; i < 5; i++) {\n    console.log("Count: " + i);\n}\n\nconst numbers = [1, 2, 3, 4, 5];\nfor (const num of numbers) {\n    console.log(num * 2);\n}',
                    story: 'プログラムの世界 - Chapter 1'
                },
                {
                    id: '3-2',
                    level: 3,
                    title: '✨ 配列メソッド - map関数',
                    description: 'ループができるようになりましたね！🎉\n次は配列メソッドです。map、filter、reduceなどを使えば、\nもっとスマートにコードが書けます！エレガントなコードを目指しましょう！💎',
                    code: 'const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconst sum = numbers.reduce((acc, n) => acc + n, 0);\nconsole.log(doubled);\nconsole.log(sum);',
                    story: 'プログラムの世界 - Chapter 1'
                },
                {
                    id: '4-1',
                    level: 4,
                    title: '🎨 オブジェクトの作成',
                    description: 'おめでとうございます！🎊 中級者の仲間入りです！\nオブジェクトを使えば、関連するデータをまとめて管理できます。\n実践的なプログラミングへの大きな一歩です！Go for it! 🚀',
                    code: 'const user = {\n    name: "Alice",\n    age: 25,\n    greet: function() {\n        return `Hi, I\'m ${this.name}!`;\n    }\n};\n\nconsole.log(user.greet());',
                    story: 'プログラムの世界 - Chapter 2'
                },
                {
                    id: '4-2',
                    level: 4,
                    title: '🔧 分割代入 - 便利な構文',
                    description: 'オブジェクトをマスターしましたね！素晴らしい！✨\n分割代入を使えば、オブジェクトや配列から値を取り出すのがとても簡単になります。\nモダンなJavaScriptには欠かせない技術です！💪',
                    code: 'const person = { name: "Bob", age: 30, city: "Tokyo" };\nconst { name, age } = person;\n\nconst colors = ["red", "green", "blue"];\nconst [first, second] = colors;\n\nconsole.log(name, age);',
                    story: 'プログラムの世界 - Chapter 2'
                }
            ]
        },
        hard: {
            stages: [
                {
                    id: '5-1',
                    level: 5,
                    title: '🏗️ クラスの基本 - オブジェクト指向',
                    description: 'ついに上級編に到達しました！🎯 あなたは本当に頑張っています！\nクラスを使えば、再利用可能なコードの設計ができます。\n大規模なアプリケーション開発への第一歩です！Let\'s Master It! 🚀',
                    code: 'class Person {\n    constructor(name, age) {\n        this.name = name;\n        this.age = age;\n    }\n    \n    introduce() {\n        return `Hi, I\'m ${this.name}, ${this.age} years old.`;\n    }\n}\n\nconst alice = new Person("Alice", 25);\nconsole.log(alice.introduce());',
                    story: 'マスターへの道 - 第1章'
                },
                {
                    id: '5-2',
                    level: 5,
                    title: '🎭 継承 - クラスを拡張しよう',
                    description: 'クラスの基本をマスターしましたね！完璧です！🌟\n次は継承です。既存のクラスを拡張して、新しい機能を追加できます。\nコードの再利用性が格段にアップします！You can do it! 💪',
                    code: 'class Animal {\n    constructor(name) {\n        this.name = name;\n    }\n    \n    speak() {\n        return `${this.name} makes a sound.`;\n    }\n}\n\nclass Dog extends Animal {\n    speak() {\n        return `${this.name} barks!`;\n    }\n}\n\nconst dog = new Dog("Buddy");\nconsole.log(dog.speak());',
                    story: 'マスターへの道 - 第1章'
                },
                {
                    id: '6-1',
                    level: 6,
                    title: '⚡ 非同期処理 - Promiseの基礎',
                    description: 'あなたは既に上級者です！🏆 誇りに思ってください！\n非同期処理はモダンなJavaScriptの核心です。\nPromiseを使えば、複雑な処理も綺麗に書けます！Let\'s Go! 🎯',
                    code: 'const fetchData = () => {\n    return new Promise((resolve, reject) => {\n        setTimeout(() => {\n            resolve("Data loaded!");\n        }, 1000);\n    });\n};\n\nfetchData()\n    .then(data => console.log(data))\n    .catch(err => console.error(err));',
                    story: 'マスターへの道 - 第2章'
                },
                {
                    id: '6-2',
                    level: 6,
                    title: '🌟 async/await - 究極の非同期',
                    description: 'Promiseをマスターしましたね！信じられません！🎊\nasync/awaitを使えば、非同期コードが同期的に書けます。\n最もモダンで読みやすいコードが書けるようになります！Amazing! ✨',
                    code: 'const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));\n\nasync function processData() {\n    console.log("Starting...");\n    await delay(1000);\n    console.log("Processing...");\n    await delay(1000);\n    console.log("Done!");\n}\n\nprocessData();',
                    story: 'マスターへの道 - 第2章'
                },
                {
                    id: '7-1',
                    level: 7,
                    title: '🎯 完全版 - Todoアプリのロジック',
                    description: 'ここまで来たあなたは真のJavaScriptマスターです！🏆\n実践的なTodoアプリのロジックを実装しましょう。\nこれまで学んだすべての技術を使います！You\'re a Star! ⭐',
                    code: 'class TodoList {\n    constructor() {\n        this.todos = [];\n    }\n    \n    add(task) {\n        this.todos.push({ id: Date.now(), task, done: false });\n    }\n    \n    toggle(id) {\n        const todo = this.todos.find(t => t.id === id);\n        if (todo) todo.done = !todo.done;\n    }\n    \n    remove(id) {\n        this.todos = this.todos.filter(t => t.id !== id);\n    }\n}\n\nconst list = new TodoList();\nlist.add("Learn JavaScript");',
                    story: 'マスターへの道 - 最終章'
                }
            ]
        }
    },

    // 他の言語も同様の構造で追加可能
    c: {
        easy: {
            stages: [
                {
                    id: '1-1',
                    level: 1,
                    title: '👋 Hello World - C言語の始まり',
                    description: 'C言語の世界へようこそ！🎯\nすべてのプログラミング言語の基礎となる、歴史あるC言語。\n最初のプログラムを書いてみましょう！Let\'s Start! 💪',
                    code: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
                    story: null
                }
            ]
        },
        medium: {
            stages: []
        },
        hard: {
            stages: []
        }
    }
};

// ハイスコア管理
const ScoreManager = {
    getHighScore(language, stageId) {
        const key = `highscore_${language}_${stageId}`;
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : null;
    },

    saveHighScore(language, stageId, scoreData) {
        const key = `highscore_${language}_${stageId}`;
        const existing = this.getHighScore(language, stageId);

        if (!existing || scoreData.score > existing.score) {
            localStorage.setItem(key, JSON.stringify({
                score: scoreData.score,
                accuracy: scoreData.accuracy,
                cpm: scoreData.cpm,
                errors: scoreData.errors,
                time: scoreData.time,
                rank: scoreData.rank,
                date: new Date().toISOString()
            }));
            return true; // 新記録
        }
        return false; // 既存記録以下
    },

    getAllScores(language) {
        const scores = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(`highscore_${language}_`)) {
                const stageId = key.replace(`highscore_${language}_`, '');
                scores[stageId] = JSON.parse(localStorage.getItem(key));
            }
        }
        return scores;
    },

    clearAllScores() {
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('highscore_')) {
                keys.push(key);
            }
        }
        keys.forEach(key => localStorage.removeItem(key));
    }
};

window.StageDatabase = StageDatabase;
window.ScoreManager = ScoreManager;

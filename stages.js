// Stage Data Loader and Manager
// データとプログラムを分離し、JSONファイルからステージ情報を動的に読み込む
// 命名規則: stage-XX-XX.json を自動検出

const StageDatabase = {
    // キャッシュ用
    cache: {},

    /**
     * 指定された言語と難易度のステージリストを取得
     * @param {string} language - 言語名 (例: 'javascript', 'c')
     * @param {string} difficulty - 難易度 (例: 'easy', 'medium', 'hard')
     * @returns {Promise<Array>} ステージデータの配列
     */
    async loadStages(language, difficulty) {
        const cacheKey = `${language}_${difficulty}`;

        // キャッシュがあれば返す
        if (this.cache[cacheKey]) {
            return this.cache[cacheKey];
        }

        try {
            // ステージディレクトリ内のJSONファイルを自動検出
            const stagesPath = `stages/${language}/${difficulty}/`;
            const stages = await this.fetchStagesFromDirectory(stagesPath);

            // IDでソート
            stages.sort((a, b) => a.id.localeCompare(b.id));

            // キャッシュに保存
            this.cache[cacheKey] = stages;

            return stages;
        } catch (error) {
            console.error(`Failed to load stages for ${language}/${difficulty}:`, error);
            return [];
        }
    },

    /**
     * ディレクトリ内のすべてのJSONファイルを自動検出して読み込む
     * 命名規則: stage-XX-XX.json (XX: 00-99)
     * @param {string} path - ディレクトリパス
     * @returns {Promise<Array>} ステージデータの配列
     */
    async fetchStagesFromDirectory(path) {
        const stages = [];
        let consecutiveNotFound = 0;
        const maxConsecutiveNotFound = 10; // 連続で10個見つからなければ終了

        // stage-00-01 から stage-99-99 まで試行
        for (let level = 0; level < 100; level++) {
            let foundInLevel = false;

            // 各レベル内で番号 1-99
            for (let num = 1; num <= 99; num++) {
                const levelStr = level.toString().padStart(2, '0');
                const numStr = num.toString().padStart(2, '0');
                const fileName = `stage-${levelStr}-${numStr}.json`;

                try {
                    const response = await fetch(`${path}${fileName}`);
                    if (response.ok) {
                        const stageData = await response.json();
                        stages.push(stageData);
                        foundInLevel = true;
                        consecutiveNotFound = 0; // リセット
                    } else if (response.status === 404) {
                        // このファイルは存在しない、次へ
                        continue;
                    }
                } catch (error) {
                    // ネットワークエラーなど、このファイルはスキップ
                    continue;
                }
            }

            // このレベルで何も見つからなければカウント
            if (!foundInLevel) {
                consecutiveNotFound++;
                // 連続で一定回数見つからなければ終了（効率化）
                if (consecutiveNotFound >= maxConsecutiveNotFound) {
                    break;
                }
            }
        }

        return stages;
    },

    /**
     * 特定のステージを取得
     * @param {string} language - 言語名
     * @param {string} difficulty - 難易度  
     * @param {string} stageId - ステージID
     * @returns {Promise<Object|null>} ステージデータ
     */
    async getStage(language, difficulty, stageId) {
        const stages = await this.loadStages(language, difficulty);
        return stages.find(stage => stage.id === stageId) || null;
    },

    /**
     * ランダムなステージを取得
     * @param {string} language - 言語名
     * @param {string} difficulty - 難易度
     * @returns {Promise<Object|null>} ランダムなステージデータ
     */
    async getRandomStage(language, difficulty) {
        const stages = await this.loadStages(language, difficulty);
        if (stages.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * stages.length);
        return stages[randomIndex];
    },

    /**
     * キャッシュをクリア
     */
    clearCache() {
        this.cache = {};
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

// グローバルに公開
window.StageDatabase = StageDatabase;
window.ScoreManager = ScoreManager;

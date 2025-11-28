// Stage Data Loader and Manager
// データとプログラムを分離し、JSONファイルからステージ情報を動的に読み込む

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
            // ステージディレクトリ内のJSONファイルを取得
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
     * ディレクトリ内のすべてのJSONファイルを読み込む
     * @param {string} path - ディレクトリパス
     * @returns {Promise<Array>} ステージデータの配列
     */
    async fetchStagesFromDirectory(path) {
        // 既知のステージファイルリストを使用
        // 実際のプロジェクトではサーバーサイドAPIやファイルシステムAPIを使用
        const stageFiles = await this.getStageFileList(path);

        const stages = [];
        for (const file of stageFiles) {
            try {
                const response = await fetch(`${path}${file}`);
                if (response.ok) {
                    const stageData = await response.json();
                    stages.push(stageData);
                }
            } catch (error) {
                console.warn(`Failed to load ${file}:`, error);
            }
        }

        return stages;
    },

    /**
     * ステージファイルのリストを取得
     * 注: ブラウザ環境では自動でファイル一覧を取得できないため、
     * 手動でリストを定義するか、サーバーサイドAPIが必要
     */
    async getStageFileList(path) {
        // 各言語・難易度のファイルマッピング
        const fileMappings = {
            'stages/javascript/easy/': [
                'stage-00-01.json',
                'stage-01-01.json',
                'stage-01-02.json',
                'stage-01-03.json',
                'stage-02-01.json',
                'stage-02-02.json',
                'stage-02-03.json'
            ],
            'stages/javascript/medium/': [
                // mediumステージファイル（今後追加）
            ],
            'stages/javascript/hard/': [
                // hardステージファイル（今後追加）
            ],
            'stages/c/easy/': [
                // Cのeasyステージファイル（今後追加）
            ],
            'stages/c/medium/': [],
            'stages/c/hard/': []
        };

        return fileMappings[path] || [];
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

// Achievement System - バッジとトロフィー管理
// ユーザーの達成度を追跡し、モチベーションを高める

const AchievementSystem = {
    // すべての実績定義
    achievements: {
        // 初心者実績
        'first_stage': {
            id: 'first_stage',
            title: '🎯 First Step',
            description: '初めてのステージをクリア',
            icon: '🎯',
            condition: (stats) => stats.stagesCleared >= 1
        },
        'five_stages': {
            id: 'five_stages',
            title: '🌟 Rising Star',
            description: '5ステージクリア',
            icon: '🌟',
            condition: (stats) => stats.stagesCleared >= 5
        },
        'ten_stages': {
            id: 'ten_stages',
            title: '⭐ Dedicated Learner',
            description: '10ステージクリア',
            icon: '⭐',
            condition: (stats) => stats.stagesCleared >= 10
        },

        // 正確性実績
        'perfect_accuracy': {
            id: 'perfect_accuracy',
            title: '💎 Perfect!',
            description: '正確性100%を達成',
            icon: '💎',
            condition: (stats) => stats.perfectRuns >= 1
        },
        'accuracy_master': {
            id: 'accuracy_master',
            title: '👑 Accuracy Master',
            description: '正確性100%を5回達成',
            icon: '👑',
            condition: (stats) => stats.perfectRuns >= 5
        },

        // スピード実績
        'speed_demon': {
            id: 'speed_demon',
            title: '⚡ Speed Demon',
            description: '500 CPMを達成',
            icon: '⚡',
            condition: (stats) => stats.maxCPM >= 500
        },
        'lightning_fast': {
            id: 'lightning_fast',
            title: '🔥 Lightning Fast',
            description: '700 CPMを達成',
            icon: '🔥',
            condition: (stats) => stats.maxCPM >= 700
        },

        // 言語別実績
        'javascript_beginner': {
            id: 'javascript_beginner',
            title: '📜 JavaScript Beginner',
            description: 'JavaScript easy全クリア',
            icon: '📜',
            condition: (stats) => (stats.languageProgress?.javascript?.easy || 0) >= 7
        },
        'python_beginner': {
            id: 'python_beginner',
            title: '🐍 Python Beginner',
            description: 'Python easy全クリア',
            icon: '🐍',
            condition: (stats) => (stats.languageProgress?.python?.easy || 0) >= 7
        },

        // ランク実績
        'rank_s': {
            id: 'rank_s',
            title: '🏆 S Rank Achiever',
            description: 'Sランクを獲得',
            icon: '🏆',
            condition: (stats) => stats.sRankCount >= 1
        },
        'rank_s_master': {
            id: 'rank_s_master',
            title: '💫 S Rank Master',
            description: 'Sランクを10回獲得',
            icon: '💫',
            condition: (stats) => stats.sRankCount >= 10
        },

        // 特殊実績
        'multi_language': {
            id: 'multi_language',
            title: '🌐 Polyglot',
            description: '3つの言語をプレイ',
            icon: '🌐',
            condition: (stats) => {
                const langs = Object.keys(stats.languageProgress || {});
                return langs.length >= 3;
            }
        },
        'persistent': {
            id: 'persistent',
            title: '💪 Persistent',
            description: '同じステージを5回プレイ',
            icon: '💪',
            condition: (stats) => stats.maxStageAttempts >= 5
        }
    },

    // 統計データ取得
    getStats() {
        const stored = localStorage.getItem('typing_stats');
        if (!stored) {
            return {
                stagesCleared: 0,
                perfectRuns: 0,
                maxCPM: 0,
                sRankCount: 0,
                languageProgress: {},
                maxStageAttempts: 0,
                totalKeystrokes: 0
            };
        }
        return JSON.parse(stored);
    },

    // 統計データ更新
    updateStats(data) {
        const stats = this.getStats();

        // ステージクリア数
        stats.stagesCleared = (stats.stagesCleared || 0) + 1;

        // 正確性100%
        if (data.accuracy === 100) {
            stats.perfectRuns = (stats.perfectRuns || 0) + 1;
        }

        // 最大CPM
        if (data.cpm > (stats.maxCPM || 0)) {
            stats.maxCPM = data.cpm;
        }

        // Sランク
        if (data.rank === 'S') {
            stats.sRankCount = (stats.sRankCount || 0) + 1;
        }

        // 言語別進捗
        if (!stats.languageProgress) stats.languageProgress = {};
        if (!stats.languageProgress[data.language]) {
            stats.languageProgress[data.language] = {
                easy: 0,
                medium: 0,
                hard: 0
            };
        }

        // ステージ試行回数（同じステージを何回プレイしたか）
        if (!stats.stageAttempts) stats.stageAttempts = {};
        const stageKey = `${data.language}_${data.stageId}`;
        stats.stageAttempts[stageKey] = (stats.stageAttempts[stageKey] || 0) + 1;
        stats.maxStageAttempts = Math.max(
            stats.maxStageAttempts || 0,
            stats.stageAttempts[stageKey]
        );

        // 総キーストローク数
        stats.totalKeystrokes = (stats.totalKeystrokes || 0) + data.totalKeystrokes;

        localStorage.setItem('typing_stats', JSON.stringify(stats));

        // 新しい実績チェック
        return this.checkNewAchievements(stats);
    },

    // 取得済み実績リスト
    getUnlockedAchievements() {
        const stored = localStorage.getItem('unlocked_achievements');
        return stored ? JSON.parse(stored) : [];
    },

    // 新しい実績をチェック
    checkNewAchievements(stats) {
        const unlocked = this.getUnlockedAchievements();
        const newAchievements = [];

        for (const [id, achievement] of Object.entries(this.achievements)) {
            // 既に取得済みならスキップ
            if (unlocked.includes(id)) continue;

            // 条件チェック
            if (achievement.condition(stats)) {
                unlocked.push(id);
                newAchievements.push(achievement);
            }
        }

        if (newAchievements.length > 0) {
            localStorage.setItem('unlocked_achievements', JSON.stringify(unlocked));
        }

        return newAchievements;
    },

    // 実績の進捗率
    getProgress() {
        const unlocked = this.getUnlockedAchievements();
        const total = Object.keys(this.achievements).length;
        return {
            unlocked: unlocked.length,
            total: total,
            percentage: Math.round((unlocked.length / total) * 100)
        };
    },

    // 実績一覧取得（表示用）
    getAllAchievements() {
        const unlocked = this.getUnlockedAchievements();
        return Object.values(this.achievements).map(achievement => ({
            ...achievement,
            unlocked: unlocked.includes(achievement.id)
        }));
    }
};

// グローバルに公開
window.AchievementSystem = AchievementSystem;

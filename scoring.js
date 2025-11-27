// Scoring System
const ScoringSystem = {
    calculateScore(timeSeconds, accuracy, difficulty, characterCount) {
        const cpm = Math.round((characterCount / timeSeconds) * 60);
        const wpm = Math.round(cpm / 5);

        const difficultyMultipliers = {
            'easy': 1.0,
            'medium': 1.5,
            'hard': 2.0
        };

        const multiplier = difficultyMultipliers[difficulty] || 1.0;
        const accuracyFactor = (accuracy / 100) ** 2;
        const score = Math.round(accuracyFactor * cpm * multiplier);

        return {
            score,
            cpm,
            wpm,
            rank: this.getRank(score, accuracy)
        };
    },

    getRank(score, accuracy) {
        if (accuracy < 80) return 'D';
        if (accuracy < 90) return 'C';
        if (score >= 500) return 'S';
        if (score >= 350) return 'A';
        if (score >= 200) return 'B';
        return 'C';
    },

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
};

window.ScoringSystem = ScoringSystem;

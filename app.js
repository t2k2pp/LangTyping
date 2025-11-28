// Main Application Controller with JSON-based Stage System
const App = {
    state: {
        language: 'javascript',
        difficulty: 'easy',
        mode: 'random', // 'random' or 'select'
        currentStage: null,
        currentCode: '',
        startTime: null,
        timerInterval: null,
        isTypingActive: false
    },

    init() {
        this.setupEventListeners();
        SoftwareKeyboard.init();
    },

    setupEventListeners() {
        // Language selection
        document.getElementById('language-select').addEventListener('change', (e) => {
            this.state.language = e.target.value;
        });

        // Difficulty selection
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.state.difficulty = e.currentTarget.dataset.difficulty;
            });
        });

        // Mode selection
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.state.mode = e.currentTarget.dataset.mode;
            });
        });

        // Start button
        document.getElementById('start-btn').addEventListener('click', () => {
            this.handleStart();
        });

        // Back from stages
        document.getElementById('back-from-stages').addEventListener('click', () => {
            this.showScreen('selection-screen');
        });

        // Preview buttons
        document.getElementById('cancel-preview-btn').addEventListener('click', () => {
            if (this.state.mode === 'select') {
                this.showScreen('stage-select-screen');
            } else {
                this.showScreen('selection-screen');
            }
        });

        document.getElementById('start-stage-btn').addEventListener('click', () => {
            this.startTyping();
        });

        // Typing controls
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restartTyping();
        });

        document.getElementById('exit-btn').addEventListener('click', () => {
            this.stopTyping();
            this.showScreen('selection-screen');
        });

        // Results buttons
        document.getElementById('back-to-menu-btn').addEventListener('click', () => {
            this.showScreen('selection-screen');
        });

        document.getElementById('retry-btn').addEventListener('click', () => {
            if (this.state.currentStage) {
                this.showPreview(this.state.currentStage);
            } else {
                this.handleStart();
            }
        });

        // Keyboard input
        document.addEventListener('keydown', (e) => {
            if (this.isTypingActive()) {
                e.preventDefault();
                this.handleTyping(e);
            }
        });
    },

    async handleStart() {
        if (this.state.mode === 'select') {
            // Show stage selection screen
            await this.showStageSelection();
        } else {
            // Random mode - pick random stage and show preview
            const stage = await this.getRandomStage();
            if (stage) {
                this.showPreview(stage);
            } else {
                alert('ステージが見つかりませんでした。');
            }
        }
    },

    async getRandomStage() {
        const lang = this.state.language;
        const diff = this.state.difficulty;

        // Load stage from JSON files
        const stage = await StageDatabase.getRandomStage(lang, diff);
        if (stage) {
            return stage;
        }

        // Fallback to old samples.js if no stages
        if (CodeSamples[lang] && CodeSamples[lang][diff]) {
            return {
                id: 'legacy',
                title: `${lang} - ${diff}`,
                description: 'プログラミングの練習をしましょう！',
                code: CodeSamples[lang][diff],
                level: 1,
                story: null
            };
        }

        return null;
    },

    async showStageSelection() {
        const lang = this.state.language;
        const diff = this.state.difficulty;
        const stageList = document.getElementById('stage-list');

        // Show loading message
        stageList.innerHTML = '<p style="text-align: center; color: var(--color-text-tertiary); padding: 2rem;">読み込み中...</p>';
        this.showScreen('stage-select-screen');

        // Load stages from JSON files
        const stages = await StageDatabase.loadStages(lang, diff);

        if (stages.length === 0) {
            stageList.innerHTML = '<p style="text-align: center; color: var(--color-text-tertiary); padding: 2rem;">このlanguage/difficultyにはステージがありません。</p>';
            return;
        }

        // Clear loading message and build stage list
        stageList.innerHTML = '';

        stages.forEach(stage => {
            const stageItem = document.createElement('div');
            stageItem.className = 'stage-item';

            const highScore = ScoreManager.getHighScore(lang, stage.id);

            stageItem.innerHTML = `
                <div class="stage-item-header">
                    <span class="stage-id">${stage.id}</span>
                    <span class="stage-score ${highScore ? 'has-score' : ''}">
                        ${highScore ? `🏆 ${highScore.score}` : '未プレイ'}
                    </span>
                </div>
                <div class="stage-title">${stage.title}</div>
                <div class="stage-preview-text">${stage.description.substring(0, 100)}...</div>
            `;

            stageItem.addEventListener('click', () => {
                this.showPreview(stage);
            });

            stageList.appendChild(stageItem);
        });
    },

    showPreview(stage) {
        this.state.currentStage = stage;
        this.state.currentCode = stage.code;

        const lang = this.state.language;
        const highScore = ScoreManager.getHighScore(lang, stage.id);

        document.getElementById('preview-stage-number').textContent = stage.id;
        document.getElementById('preview-title').textContent = stage.title;
        document.getElementById('preview-description').textContent = stage.description;
        document.getElementById('preview-code').textContent = stage.code;

        const highScoreBadge = document.getElementById('preview-highscore');
        if (highScore) {
            document.getElementById('preview-hs-value').textContent = highScore.score;
            highScoreBadge.style.display = 'inline-block';
        } else {
            highScoreBadge.style.display = 'none';
        }

        this.showScreen('preview-screen');
    },

    startTyping() {
        if (!this.state.currentCode) return;

        // Update header
        const langDisplay = this.state.language.charAt(0).toUpperCase() + this.state.language.slice(1);
        const diffDisplay = this.state.difficulty.charAt(0).toUpperCase() + this.state.difficulty.slice(1);
        document.getElementById('current-language').textContent = langDisplay;
        document.getElementById('current-difficulty').textContent = diffDisplay;

        const stageBadge = document.getElementById('current-stage');
        if (this.state.currentStage && this.state.currentStage.id !== 'legacy') {
            stageBadge.textContent = this.state.currentStage.id;
            stageBadge.style.display = 'inline-block';
        } else {
            stageBadge.style.display = 'none';
        }

        // Set file name
        const fileExt = this.getFileExtension(this.state.language);
        document.getElementById('file-name').textContent = `main.${fileExt}`;

        // Initialize typing engine
        TypingEngine.init(this.state.currentCode);

        // Start timer
        this.state.startTime = Date.now();
        this.state.isTypingActive = true;
        this.startTimer();

        this.showScreen('typing-screen');
    },

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

    startTimer() {
        this.state.timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.state.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            document.getElementById('timer').textContent =
                `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    },

    stopTimer() {
        if (this.state.timerInterval) {
            clearInterval(this.state.timerInterval);
            this.state.timerInterval = null;
        }
    },

    handleTyping(e) {
        let char = e.key;

        // Handle special keys
        if (char === 'Enter') char = '\n';
        else if (char === 'Tab') char = '\t';
        else if (char.length > 1) return; // Ignore other special keys

        const isCorrect = TypingEngine.handleKeyPress(char);
        this.updateStats();

        if (TypingEngine.isComplete()) {
            this.finishTyping();
        }
    },

    updateStats() {
        const accuracy = TypingEngine.getAccuracy();
        const elapsed = (Date.now() - this.state.startTime) / 1000;
        const cpm = TypingEngine.getCPM(elapsed);

        document.getElementById('accuracy').textContent = `${accuracy.toFixed(1)}%`;
        document.getElementById('speed').textContent = `${Math.round(cpm)} CPM`;
        document.getElementById('errors').textContent = TypingEngine.errors;
    },

    finishTyping() {
        this.state.isTypingActive = false;
        this.stopTimer();

        const elapsed = (Date.now() - this.state.startTime) / 1000;
        const result = ScoringSystem.calculateScore(
            elapsed,
            TypingEngine.correctKeystrokes,
            TypingEngine.totalKeystrokes,
            this.state.difficulty,
            this.state.currentCode.length
        );

        this.showResults(result, elapsed);
    },

    showResults(result, elapsed) {
        // Check for new record
        const lang = this.state.language;
        const stageId = this.state.currentStage ? this.state.currentStage.id : 'legacy';

        const scoreData = {
            score: result.score,
            accuracy: result.accuracy,
            cpm: result.cpm,
            errors: TypingEngine.errors,
            time: elapsed,
            rank: result.rank
        };

        const previousScore = ScoreManager.getHighScore(lang, stageId);
        const isNewRecord = ScoreManager.saveHighScore(lang, stageId, scoreData);

        // Display results
        document.getElementById('rank').textContent = result.rank;
        document.getElementById('final-score').textContent = result.score;
        document.getElementById('result-time').textContent = ScoringSystem.formatTime(elapsed);
        document.getElementById('result-accuracy').textContent = `${result.accuracy.toFixed(1)}%`;
        document.getElementById('result-speed').textContent = Math.round(result.cpm);
        document.getElementById('result-errors').textContent = TypingEngine.errors;

        // Animate score ring
        const ring = document.getElementById('score-ring');
        const circumference = 534;
        const offset = circumference - (result.accuracy / 100) * circumference;
        ring.style.strokeDashoffset = offset;

        // Show new record badge
        const newRecordBadge = document.getElementById('new-record-badge');
        if (isNewRecord) {
            newRecordBadge.style.display = 'block';
        } else {
            newRecordBadge.style.display = 'none';
        }

        // Show high score comparison
        const comparisonDiv = document.getElementById('highscore-comparison');
        if (previousScore && !isNewRecord) {
            comparisonDiv.style.display = 'block';
            document.getElementById('current-score-display').textContent = result.score;
            document.getElementById('previous-best-display').textContent = previousScore.score;
        } else {
            comparisonDiv.style.display = 'none';
        }

        this.showScreen('results-screen');
    },

    restartTyping() {
        this.stopTimer();
        this.state.isTypingActive = false;

        if (this.state.currentStage) {
            this.showPreview(this.state.currentStage);
        }
    },

    stopTyping() {
        this.state.isTypingActive = false;
        this.stopTimer();
    },

    isTypingActive() {
        return this.state.isTypingActive;
    },

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

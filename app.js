// Main Application Controller
const App = {
    state: {
        selectedLanguage: 'javascript',
        selectedDifficulty: 'medium',
        currentText: '',
        startTime: null,
        timerInterval: null,
        fileName: 'main.js'
    },

    init() {
        this.setupEventListeners();
        SoftwareKeyboard.init();
    },

    setupEventListeners() {
        const difficultyBtns = document.querySelectorAll('.difficulty-btn');
        difficultyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                difficultyBtns.forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.state.selectedDifficulty = e.currentTarget.dataset.difficulty;
            });
        });

        document.getElementById('language-select').addEventListener('change', (e) => {
            this.state.selectedLanguage = e.target.value;
            this.updateFileName();
        });

        document.getElementById('start-btn').addEventListener('click', () => {
            this.startTyping();
        });

        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restartTyping();
        });

        document.getElementById('exit-btn').addEventListener('click', () => {
            this.exitToMenu();
        });

        document.getElementById('retry-btn').addEventListener('click', () => {
            this.startTyping();
        });

        document.getElementById('back-to-menu-btn').addEventListener('click', () => {
            this.showScreen('selection-screen');
        });

        document.addEventListener('keydown', (e) => {
            if (this.isTypingActive()) {
                e.preventDefault();
                this.handleTyping(e);
            }
        });
    },

    updateFileName() {
        const fileExtensions = {
            'english': 'txt',
            'javascript': 'js',
            'react': 'jsx',
            'nodejs': 'js',
            'c': 'c',
            'cpp': 'cpp',
            'csharp': 'cs',
            'sql': 'sql',
            'rust': 'rs',
            'cobol': 'cob',
            'bash': 'sh',
            'cshell': 'csh',
            'json': 'json',
            'xml': 'xml',
            'yaml': 'yml',
            'csv': 'csv',
            'toml': 'toml',
            'powershell': 'ps1',
            'dos': 'bat'
        };

        const ext = fileExtensions[this.state.selectedLanguage] || 'txt';
        this.state.fileName = `main.${ext}`;
    },

    startTyping() {
        this.updateFileName();
        const lang = this.state.selectedLanguage;
        const diff = this.state.selectedDifficulty;
        this.state.currentText = CodeSamples[lang][diff];

        document.getElementById('current-language').textContent =
            document.querySelector(`option[value="${lang}"]`).textContent;
        document.getElementById('current-difficulty').textContent =
            diff.charAt(0).toUpperCase() + diff.slice(1);
        document.getElementById('file-name').textContent = this.state.fileName;

        TypingEngine.init(this.state.currentText);
        this.state.startTime = Date.now();
        this.startTimer();
        this.updateStats();

        this.showScreen('typing-screen');
    },

    restartTyping() {
        this.stopTimer();
        TypingEngine.init(this.state.currentText);
        this.state.startTime = Date.now();
        this.startTimer();
        this.updateStats();
    },

    exitToMenu() {
        this.stopTimer();
        this.showScreen('selection-screen');
    },

    handleTyping(e) {
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        if (e.key === 'F5' || e.key === 'F12') return;

        let char = e.key;

        if (char === 'Enter') char = '\n';
        else if (char === 'Tab') char = '\t';
        else if (char.length > 1) return;

        const isCorrect = TypingEngine.handleKeyPress(char);
        this.updateStats();

        if (TypingEngine.isComplete()) {
            this.finishTyping();
        }
    },

    updateStats() {
        const accuracy = TypingEngine.getAccuracy();
        const elapsed = this.getElapsedSeconds();
        const cpm = elapsed > 0 ? Math.round((TypingEngine.currentPosition / elapsed) * 60) : 0;

        document.getElementById('accuracy').textContent = accuracy + '%';
        document.getElementById('speed').textContent = cpm + ' CPM';
        document.getElementById('errors').textContent = TypingEngine.errors;
    },

    finishTyping() {
        this.stopTimer();
        const elapsed = this.getElapsedSeconds();
        const accuracy = TypingEngine.getAccuracy();
        const characterCount = this.state.currentText.length;

        const result = ScoringSystem.calculateScore(
            elapsed,
            accuracy,
            this.state.selectedDifficulty,
            characterCount
        );

        this.showResults(result, elapsed, accuracy);
    },

    showResults(result, elapsed, accuracy) {
        document.getElementById('rank').textContent = result.rank;
        document.getElementById('final-score').textContent = result.score;
        document.getElementById('result-time').textContent = ScoringSystem.formatTime(elapsed);
        document.getElementById('result-accuracy').textContent = accuracy + '%';
        document.getElementById('result-speed').textContent = result.cpm;
        document.getElementById('result-errors').textContent = TypingEngine.errors;

        const progress = Math.min(100, (result.score / 500) * 100);
        const circumference = 2 * Math.PI * 85;
        const offset = circumference - (progress / 100) * circumference;

        this.showScreen('results-screen');

        setTimeout(() => {
            const ring = document.getElementById('score-ring');
            if (ring) {
                ring.style.strokeDashoffset = offset;
            }
        }, 100);
    },

    startTimer() {
        this.state.timerInterval = setInterval(() => {
            const elapsed = this.getElapsedSeconds();
            document.getElementById('timer').textContent = ScoringSystem.formatTime(elapsed);
        }, 1000);
    },

    stopTimer() {
        if (this.state.timerInterval) {
            clearInterval(this.state.timerInterval);
            this.state.timerInterval = null;
        }
    },

    getElapsedSeconds() {
        if (!this.state.startTime) return 0;
        return Math.floor((Date.now() - this.state.startTime) / 1000);
    },

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    },

    isTypingActive() {
        return document.getElementById('typing-screen').classList.contains('active');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

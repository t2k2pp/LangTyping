// Typing Engine
const TypingEngine = {
    text: '',
    currentPosition: 0,
    errors: 0,
    totalKeystrokes: 0,
    correctKeystrokes: 0,

    init(text) {
        this.text = text;
        this.currentPosition = 0;
        this.errors = 0;
        this.totalKeystrokes = 0;
        this.correctKeystrokes = 0;
        this.render();
    },

    render() {
        const codeTextElement = document.getElementById('code-text');
        let html = '';

        for (let i = 0; i < this.text.length; i++) {
            const char = this.text[i];

            if (i < this.currentPosition) {
                html += `<span class="typed">${this.escapeHtml(char)}</span>`;
            } else if (i === this.currentPosition) {
                html += `<span class="cursor">${this.escapeHtml(char)}</span>`;
            } else {
                html += this.escapeHtml(char);
            }
        }

        codeTextElement.innerHTML = html;

        const lines = this.text.substring(0, this.currentPosition + 1).split('\n');
        const lineCount = Math.max(this.text.split('\n').length, 1);
        const lineNumbers = document.getElementById('line-numbers');
        lineNumbers.innerHTML = Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');
    },

    handleKeyPress(key) {
        this.totalKeystrokes++;

        const expectedChar = this.text[this.currentPosition];

        if (key === expectedChar) {
            this.correctKeystrokes++;
            this.currentPosition++;
            SoftwareKeyboard.highlightKey(key);
            this.render();
            return true;
        } else {
            this.errors++;
            this.showError();
            return false;
        }
    },

    showError() {
        const codeTextElement = document.getElementById('code-text');
        codeTextElement.classList.add('error-flash');
        setTimeout(() => {
            codeTextElement.classList.remove('error-flash');
        }, 200);
    },

    isComplete() {
        return this.currentPosition >= this.text.length;
    },

    getAccuracy() {
        if (this.totalKeystrokes === 0) return 100;
        return Math.round((this.correctKeystrokes / this.totalKeystrokes) * 100);
    },

    getProgress() {
        return Math.round((this.currentPosition / this.text.length) * 100);
    },

    escapeHtml(char) {
        const map = {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return map[char] || char;
    }
};

window.TypingEngine = TypingEngine;

// Software Keyboard Component
const SoftwareKeyboard = {
    // 日本語配列キーボードレイアウト（通常時）
    layoutNormal: [
        [
            { key: '`', shift: false },
            { key: '1', shift: '!' },
            { key: '2', shift: '"' },
            { key: '3', shift: '#' },
            { key: '4', shift: '$' },
            { key: '5', shift: '%' },
            { key: '6', shift: '&' },
            { key: '7', shift: "'" },
            { key: '8', shift: '(' },
            { key: '9', shift: ')' },
            { key: '0', shift: false },
            { key: '-', shift: '=' },
            { key: '^', shift: '~' },
            { key: '¥', shift: '|' },
            { key: 'Backspace', special: true }
        ],
        [
            { key: 'Tab', special: true },
            { key: 'q', shift: 'Q' },
            { key: 'w', shift: 'W' },
            { key: 'e', shift: 'E' },
            { key: 'r', shift: 'R' },
            { key: 't', shift: 'T' },
            { key: 'y', shift: 'Y' },
            { key: 'u', shift: 'U' },
            { key: 'i', shift: 'I' },
            { key: 'o', shift: 'O' },
            { key: 'p', shift: 'P' },
            { key: '@', shift: '`' },
            { key: '[', shift: '{' },
            { key: 'Enter', special: true }
        ],
        [
            { key: 'Caps', special: true },
            { key: 'a', shift: 'A' },
            { key: 's', shift: 'S' },
            { key: 'd', shift: 'D' },
            { key: 'f', shift: 'F' },
            { key: 'g', shift: 'G' },
            { key: 'h', shift: 'H' },
            { key: 'j', shift: 'J' },
            { key: 'k', shift: 'K' },
            { key: 'l', shift: 'L' },
            { key: ';', shift: '+' },
            { key: ':', shift: '*' },
            { key: ']', shift: '}' }
        ],
        [
            { key: 'Shift', special: true },
            { key: 'z', shift: 'Z' },
            { key: 'x', shift: 'X' },
            { key: 'c', shift: 'C' },
            { key: 'v', shift: 'V' },
            { key: 'b', shift: 'B' },
            { key: 'n', shift: 'N' },
            { key: 'm', shift: 'M' },
            { key: ',', shift: '<' },
            { key: '.', shift: '>' },
            { key: '/', shift: '?' },
            { key: '\\', shift: '_' },
            { key: 'Shift', special: true }
        ],
        [
            { key: 'Ctrl', special: true },
            { key: 'Alt', special: true },
            { key: 'Space', special: true },
            { key: 'Alt', special: true },
            { key: 'Ctrl', special: true }
        ]
    ],

    keyMap: {},
    shiftPressed: false,
    capsLockOn: false,

    init() {
        const container = document.getElementById('software-keyboard');
        container.innerHTML = '';

        this.layoutNormal.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'keyboard-row';

            row.forEach(keyData => {
                const keyDiv = document.createElement('div');
                keyDiv.className = 'key';

                const keyLower = keyData.key.toLowerCase();

                // 特殊キーにクラスを追加
                if (keyData.special) {
                    if (keyLower === 'space') keyDiv.classList.add('space');
                    if (keyLower === 'backspace') keyDiv.classList.add('backspace');
                    if (keyLower === 'tab') keyDiv.classList.add('tab');
                    if (keyLower === 'caps') keyDiv.classList.add('caps');
                    if (keyLower === 'enter') keyDiv.classList.add('enter');
                    if (keyLower === 'shift') keyDiv.classList.add('shift');
                    if (keyLower === 'ctrl') keyDiv.classList.add('ctrl');
                    if (keyLower === 'alt') keyDiv.classList.add('alt');
                }

                const span = document.createElement('span');
                span.textContent = keyData.key;
                keyDiv.appendChild(span);

                // キーマップに登録
                keyDiv.dataset.normalKey = keyData.key;
                keyDiv.dataset.shiftKey = keyData.shift || keyData.key;

                this.keyMap[keyLower] = keyDiv;

                // 文字キーの場合、通常の文字でもマッピング
                if (!keyData.special && keyData.key.length === 1) {
                    this.keyMap[keyData.key] = keyDiv;
                    if (keyData.shift && keyData.shift.length === 1) {
                        this.keyMap[keyData.shift] = keyDiv;
                    }
                }

                rowDiv.appendChild(keyDiv);
            });

            container.appendChild(rowDiv);
        });

        // Shiftキー/CapsLockの状態監視
        this.setupKeyListeners();
    },

    setupKeyListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Shift') {
                this.shiftPressed = true;
                this.updateKeyDisplay();
            } else if (e.key === 'CapsLock') {
                this.capsLockOn = !this.capsLockOn;
                this.updateKeyDisplay();
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 'Shift') {
                this.shiftPressed = false;
                this.updateKeyDisplay();
            }
        });
    },

    updateKeyDisplay() {
        const isShifted = this.shiftPressed || this.capsLockOn;

        Object.keys(this.keyMap).forEach(key => {
            const keyElement = this.keyMap[key];
            if (keyElement && keyElement.dataset.normalKey) {
                const span = keyElement.querySelector('span');
                if (span) {
                    if (isShifted && keyElement.dataset.shiftKey !== keyElement.dataset.normalKey) {
                        span.textContent = keyElement.dataset.shiftKey;
                    } else {
                        span.textContent = keyElement.dataset.normalKey;
                    }
                }
            }
        });
    },

    highlightKey(key) {
        let keyElement = null;

        // 特殊キーのマッピング
        if (key === ' ') {
            keyElement = this.keyMap['space'];
        } else if (key === '\n') {
            keyElement = this.keyMap['enter'];
        } else if (key === '\t') {
            keyElement = this.keyMap['tab'];
        } else {
            // 通常のキーを検索
            keyElement = this.keyMap[key] || this.keyMap[key.toLowerCase()];
        }

        if (keyElement) {
            keyElement.classList.add('active');
            setTimeout(() => {
                keyElement.classList.remove('active');
            }, 200);
        }
    }
};

window.SoftwareKeyboard = SoftwareKeyboard;

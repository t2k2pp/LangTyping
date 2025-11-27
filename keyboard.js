// Software Keyboard Component
const SoftwareKeyboard = {
    layout: [
        ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
        ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
        ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
        ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
        ['Ctrl', 'Alt', 'Space', 'Alt', 'Ctrl']
    ],

    keyMap: {},

    init() {
        const container = document.getElementById('software-keyboard');
        container.innerHTML = '';
        
        this.layout.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'keyboard-row';
            
            row.forEach(key => {
                const keyDiv = document.createElement('div');
                keyDiv.className = 'key';
                
                const keyText = key.toLowerCase();
                if (keyText === 'space') keyDiv.classList.add('space');
                if (keyText === 'backspace') keyDiv.classList.add('backspace');
                if (keyText === 'tab') keyDiv.classList.add('tab');
                if (keyText === 'caps') keyDiv.classList.add('caps');
                if (keyText === 'enter') keyDiv.classList.add('enter');
                if (keyText === 'shift') keyDiv.classList.add('shift');
                if (keyText === 'ctrl') keyDiv.classList.add('ctrl');
                if (keyText === 'alt') keyDiv.classList.add('alt');
                
                const span = document.createElement('span');
                span.textContent = key;
                keyDiv.appendChild(span);
                
                this.keyMap[keyText] = keyDiv;
                rowDiv.appendChild(keyDiv);
            });
            
            container.appendChild(rowDiv);
        });
    },

    highlightKey(key) {
        const normalizedKey = key.toLowerCase();
        let keyElement = this.keyMap[normalizedKey];
        
        if (!keyElement) {
            if (key === ' ') keyElement = this.keyMap['space'];
            else if (key === '\n') keyElement = this.keyMap['enter'];
            else if (key === '\t') keyElement = this.keyMap['tab'];
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

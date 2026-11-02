const display = document.getElementById('display');
const keys = document.querySelector('.calculator-keys');

let currentInput = '0';
let previousInput = '';
let operation = null;
let resetScreen = false;

keys.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.classList.contains('btn')) return;

    if (target.classList.contains('number')) {
        const value = target.getAttribute('data-value');
        if (currentInput === '0' || resetScreen) {
            currentInput = value;
            resetScreen = false;
        } else {
            if (value === '.' && currentInput.includes('.')) return;
            currentInput += value;
        }
        updateDisplay();
    }

    if (target.classList.contains('function')) {
        const action = target.getAttribute('data-action');
        if (action === 'clear') {
            clearCalculator();
        } else if (action === 'double-zero') {
            if (currentInput !== '0') {
                currentInput += '00';
                updateDisplay();
            }
        } else if (action === 'percent') {
            currentInput = String(parseFloat(currentInput) / 100);
            updateDisplay();
        }
    }

    if (target.classList.contains('operator') && target.getAttribute('data-action') !== 'calculate') {
        const action = target.getAttribute('data-action');
        if (operation !== null) calculateResult();
        previousInput = currentInput;
        operation = action;
        resetScreen = true;
    }

    if (target.getAttribute('data-action') === 'calculate') {
        if (operation === null || resetScreen) return;
        calculateResult();
        operation = null;
    }
});

function calculateResult() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(curr)) return;

    switch (operation) {
        case 'add': result = prev + curr; break;
        case 'subtract': result = prev - curr; break;
        case 'multiply': result = prev * curr; break;
        case 'divide': result = curr === 0 ? 'Error' : prev / curr; break;
        default: return;
    }

    currentInput = String(result);
    previousInput = '';
    resetScreen = true;
    updateDisplay();
}

function clearCalculator() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    resetScreen = false;
    updateDisplay();
}

function updateDisplay() {
    display.textContent = currentInput;
}
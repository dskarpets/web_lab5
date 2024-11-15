// Завдання 1: Поміняти тексти між блоками 1 та 6
function swapTexts() {
    const block1 = document.querySelector('.block-1 h1');
    const block6 = document.querySelector('.block-6 h1');
    [block1.textContent, block6.textContent] = [block6.textContent, block1.textContent];
}

document.getElementById('swapTexts').addEventListener('click', swapTexts);

// Завдання 2: Обчислити площу п'ятикутника
function calculatePentagonArea() {
    const side = 5; // умовна довжина сторони
    const area = (5 / 4) * Math.pow(side, 2) / Math.tan(Math.PI / 5);
    const resultDiv = document.getElementById('pentagonAreaResult');

    // Додаємо новий div після зображення
    const result = document.createElement('div');
    result.textContent = `Площа п'ятикутника: ${area.toFixed(2)} кв. од.`;
    result.style.marginTop = '10px';
    resultDiv.appendChild(result);
}

document.getElementById('calculatePentagonArea').addEventListener('click', calculatePentagonArea);

// Завдання 3: Перевірка трикутника
function checkTriangle() {
    const a = parseFloat(document.getElementById('sideA').value);
    const b = parseFloat(document.getElementById('sideB').value);
    const c = parseFloat(document.getElementById('sideC').value);
    const isTriangle = a + b > c && a + c > b && b + c > a;

    alert(isTriangle ? 'Трикутник можливий' : 'Трикутник неможливий');
    document.cookie = `triangle=${isTriangle ? 'valid' : 'invalid'}; max-age=60`;
}

document.getElementById('checkTriangle').addEventListener('click', checkTriangle);

// Обробка збережених кукі при завантаженні сторінки
function handleCookieOnLoad() {
    const cookieMatch = document.cookie.match(/triangle=(valid|invalid)/);
    if (cookieMatch) {
        const isTriangle = cookieMatch[1] === 'valid';
        const message = isTriangle
            ? 'Збережено: трикутник можливий.'
            : 'Збережено: трикутник неможливий.';

        if (confirm(`${message}\nДані буде видалено після OK.`)) {
            document.cookie = 'triangle=; max-age=0'; // Видалення cookies
            alert('Дані кукі видалено.');
            location.reload();
        }
    }
}

window.onload = handleCookieOnLoad;

// Завдання 4: Верхній регістр перших літер
function setupCapitalizationFeature(blockSelector, checkboxSelector, storageKey) {
    const checkbox = document.querySelector(checkboxSelector);
    const block = document.querySelector(blockSelector);

    // Функція для оновлення стилю блоку
    const updateBlockStyle = (capitalize) => {
        block.style.textTransform = capitalize ? "capitalize" : "none";
    };

    // Відновлюємо стан галочки та стиль блоку з localStorage
    const storedState = localStorage.getItem(storageKey);
    const capitalizeState = storedState === "true";
    checkbox.checked = capitalizeState;
    updateBlockStyle(capitalizeState);

    // Слухаємо зміни галочки
    checkbox.addEventListener("change", () => {
        const isChecked = checkbox.checked;
        updateBlockStyle(isChecked);
        localStorage.setItem(storageKey, isChecked);
    });
}

// Виклик функції для блоку "4"
document.addEventListener("DOMContentLoaded", () => {
    setupCapitalizationFeature(".block-4", "#capitalizeCheckbox", "capitalizeBlock4");
});

// Завдання 5: Редагування тексту
function createEditableBlockList() {
    const blockList = document.createElement('ol');
    blockList.innerHTML = `
        <li>Блок 1</li>
        <li>Блок 2</li>
        <li>Блок 3</li>
        <li>Блок 4</li>
        <li>Блок 5</li>
        <li>Блок 6</li>
    `;
    document.querySelector('.block-3').appendChild(blockList);

    blockList.addEventListener('dblclick', handleBlockEdit);
}

function handleBlockEdit(e) {
    if (e.target.tagName === 'LI') {
        const blockNum = e.target.textContent.split(' ')[1];
        const block = document.querySelector(`.block-${blockNum}`);
        const currentText = block.innerHTML;
        block.innerHTML = `<textarea>${currentText}</textarea><br>
            <button class="saveText">Зберегти</button>
            <button class="discardText">Скасувати</button>`;

        block.querySelector('.saveText').addEventListener('click', function () {
            const newText = block.querySelector('textarea').value;
            localStorage.setItem(`block${blockNum}`, newText);
            block.innerHTML = newText;
        });

        block.querySelector('.discardText').addEventListener('click', function () {
            const savedText = localStorage.getItem(`block${blockNum}`) || currentText;
            block.innerHTML = savedText;
        });
    }
}

createEditableBlockList();

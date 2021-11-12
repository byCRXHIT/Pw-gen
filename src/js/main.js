import { PasswordGenerator } from './generatepassword';

let currentPassword = [];
let clipboardState = false;
const controlsContainer = document.querySelector('#controls');
const passwordContainer = document.querySelector('#password');
const lengthContainer = document.querySelector('#length-value');
const passwordGenerator = new PasswordGenerator();
const getRandomCharacter = () => {
    return Math.random().toString(16).substr(2, 1);
}

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

//⌄⌄⌄ Real ebig stuff here ⌄⌄⌄
// yez -Bey
const animatePassword = () => {
    passwordContainer.innerHTML = '';
    const passwordElements = document.createElement('div');
    passwordElements.setAttribute('class', 'characters');
    currentPassword.forEach((character, index) => {
        const characterElement = document.createElement('div');
        characterElement.setAttribute('class', 'character');
        characterElement.setAttribute('id', `character-${index}`);
        characterElement.setAttribute('data-character', character);
        passwordElements.appendChild(characterElement);
    });
    passwordContainer.appendChild(passwordElements);
    const copyed = document.createElement('div');
    copyed.innerHTML = 'Copy Password';
    copyed.setAttribute('id', 'copied');
    copyed.setAttribute('class', 'copied');
    passwordContainer.appendChild(copyed);
    const characterContainers = document.querySelectorAll('.character');
    characterContainers.forEach(character => {
        animateCharacter(character)
    });
}
// so essentially CSS but in JS? -Bey
const animateCharacter = (element) => {
    setTimeout(() => {
        element.classList.add('show');
        setTimeout(() => {
            element.classList.add('animate');
            const maxTicker = getRandomNumber(5, 15);
            let ticker = 0;
            const letterAnimation = setInterval(() => {
                element.innerHTML = getRandomCharacter(10);
                if (ticker === maxTicker) {
                    element.classList.remove('animate');
                    element.classList.add('done');
                    element.innerHTML = element.dataset.character;
                    clearInterval(letterAnimation);
                }
                ticker++;
            }, 50);
        }, getRandomNumber(0, 150));
    }, getRandomNumber(0, 150));
}

const copyToClipBoard = () => {
    if (!clipboardState) {
        clipboardState = true;
        navigator.clipboard.writeText(currentPassword.join('')).then(() => {
            const cta = document.querySelector('#copyed');
            cta.classList.add('copyed-done');
            cta.innerHTML = 'Copied Password to Clipboard!';
            setTimeout(() => {
                cta.classList.remove('copyed-done');
                clipboardState = false;
            }, 500);
        });
    }
}

const setCurrentPassword = (controls) => {
    currentPassword = passwordGenerator.getPassword(controls);
    animatePassword();
}
const getFormValues = ($event) => {
    let controlValues = {};
    Object.keys($event.currentTarget.elements).forEach(key => {
        let element = $event.currentTarget.elements[key];
        if (element.type === 'checkbox') {
            controlValues[element.name] = element.checked;
        }
        
        if (element.type === 'range') {
            controlValues[element.name] = +element.value;
            lengthContainer.innerHTML = +element.value;
        }
    });
    return controlValues;
}
// who uses 45 letter passes?
//i do - byCRXHIT
setCurrentPassword({
    length: 16,
    specialCharacters: false,
    numbers: true,
    letters: true,
    lockedSpecialCharacters: true
});


passwordContainer.addEventListener('click', copyToClipBoard);

controlsContainer.addEventListener('submit', ($event) => {
    $event.preventDefault();
    setCurrentPassword(getFormValues($event));
});

controlsContainer.addEventListener('change', ($event) => {
    $event.preventDefault();
    setCurrentPassword(getFormValues($event));
});

controlsContainer.addEventListener('input', ($event) => {
    $event.preventDefault();
    getFormValues($event);
});

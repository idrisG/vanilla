"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numberRegex = /[1-9][0-9]*/;
const numberPointsInput = document.getElementById('points');
const radiusSpinnerInput = document.getElementById('radius');
const preview = document.getElementById('preview');
const code = document.getElementById('code');
const inputs = document.getElementById('inputs');
if (inputs) {
    inputs.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            generateSpinner();
        }
    });
}
function generateSpinner() {
    if (numberPointsInput && radiusSpinnerInput) {
        const numberPoints = numberPointsInput.value;
        const radiusSpinner = radiusSpinnerInput.value;
        if (preview &&
            code &&
            numberPoints.match(numberRegex) &&
            radiusSpinner.match(numberRegex)) {
            var codes = generateCode(Number(numberPoints), Number(radiusSpinner));
            preview.innerHTML = `${codes.html}\n<style>${codes.css}</style>`;
            code.innerHTML =
                `${codes.html}\n<style>\n${codes.css}</style>`.replace('\n', '&#013; &#010;');
        }
    }
}
function generateCode(number, radius) {
    var angle;
    var translateX;
    var translateY;
    var htmlCode = '<div class="spinner-container">\n';
    var cssCode = `.spinner-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: rotate-spinner 1s linear 0s infinite;
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
@keyframes rotate-spinner {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(-360deg);
    }
}
.spinner {
    position: absolute;
    background-color: #582eff;
    width: 24px;
    height: 24px;
    border-radius: 50%;
}
.spinner:nth-child(2n) {
    background-color: #7856ff;
}
`;
    for (let index = 1; index <= number; index++) {
        angle = (index * 2 * Math.PI) / number;
        translateX = Math.cos(angle) * radius;
        translateY = Math.sin(angle) * radius;
        if (Math.abs(translateX) <= 0.01) {
            translateX = 0;
        }
        if (Math.abs(translateY) <= 0.01) {
            translateY = 0;
        }
        var transform = `transform: translate(${translateX}px, ${translateY}px);`;
        var animation = `@keyframes translate-${index} {
    0% {
        transform: translate(0);
    }
    50% {
        ${transform}
    }
    100% {
        transform: translate(0);
    }
}
`;
        var useAnimation = `.spinner:nth-child(${index}) {
    transform: translate(0);
    animation: translate-${index} 2s cubic-bezier(1,0.5,0.5,1) infinite;
}`;
        cssCode += animation + '\n' + useAnimation + '\n';
        htmlCode += '   <div class="spinner"></div>\n';
    }
    htmlCode += '</div>\n';
    return { html: htmlCode, css: cssCode };
}

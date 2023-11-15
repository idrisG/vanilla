const numberRegex = /[1-9][0-9]*/;
const numberPointsInput = document.getElementById('points');
const radiusSpinnerInput = document.getElementById('radius');
const preview = document.getElementById('preview');
const code = document.getElementById('code');
document.getElementById('inputs').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        generateSpinner();
    }
});

function generateSpinner() {
    const numberPoints = numberPointsInput.value;
    const radiusSpinner = radiusSpinnerInput.value;

    if (numberPoints.match(numberRegex) && radiusSpinner.match(numberRegex)) {
        var codes = generateCode(numberPoints, radiusSpinner);
        preview.innerHTML = `${codes.html}\n<style>${codes.css}</style>`;
        code.innerHTML = `${codes.html}\n<style>\n${codes.css}</style>`.replace(
            '\n',
            '&#013; &#010;',
        );
    }
}

function generateCode(number, radius) {
    var htmlCode = '<div class="spinner-container-container">\n';
    var cssCode = `@keyframes rotate-spinner {
    0% {
        transform: rotate(0deg);
    }
    70% {
        transform: rotate(-360deg);
    }
    100% {
        transform: rotate(-360deg);
    }
}
.spinner-container-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.spinner-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: rotate-spinner 3s cubic-bezier(1,0.5,0.5,1) 0s infinite;
    border-radius: 50%;
}
.spinner-container.fixed {
    animation: none;
}
.spinner {
    position: absolute;
    background-color: #582eff;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    transform: translate(${radius}px, 0);
}
`;
    var delay = 1000 / number;
    var step = 1000 / number;
    htmlCode += `
    <div class="spinner-container">
        <div class="spinner"></div>
    </div>`;
    for (let index = 2; index <= number; index++) {
        var transform = `.spinner-container:nth-child(${index}) {
    animation-delay: ${delay}ms;
}`;
        cssCode += transform + '\n';
        htmlCode += `
    <div class="spinner-container">
        <div class="spinner"></div>
    </div>`;
        delay += step;
    }
    htmlCode += '\n</div>';
    return { html: htmlCode, css: cssCode };
}

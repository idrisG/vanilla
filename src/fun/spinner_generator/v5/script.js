const numberRegex = /[1-9][0-9]*/;
const numberPointsInnerInput = document.getElementById('points-inner');
const radiusSpinnerInnerInput = document.getElementById('radius-inner');
const numberPointsOuterInput = document.getElementById('points-outer');
const radiusSpinnerOuterInput = document.getElementById('radius-outer');
const preview = document.getElementById('preview');
const code = document.getElementById('code');
document.getElementById('inputs').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        generateSpinner();
    }
});

function generateSpinner() {
    const numberPointsInner = numberPointsInnerInput.value;
    const radiusSpinnerInner = radiusSpinnerInnerInput.value;
    const numberPointsOuter = numberPointsOuterInput.value;
    const radiusSpinnerOuter = radiusSpinnerOuterInput.value;

    if (
        numberPointsInner.match(numberRegex) &&
        radiusSpinnerInner.match(numberRegex) &&
        numberPointsOuter.match(numberRegex) &&
        radiusSpinnerOuter.match(numberRegex)
    ) {
        var codes = generateCode(numberPointsInner, radiusSpinnerInner, 1);
        const codes2 = generateCode(numberPointsOuter, radiusSpinnerOuter, 2);
        codes.html += codes2.html;
        codes.css += codes2.css;
        preview.innerHTML = `${codes.html}\n<style>${codes.css}</style>`;
        code.innerHTML = `${codes.html}\n<style>\n${codes.css}</style>`.replace(
            '\n',
            '&#013; &#010;',
        );
    }
}

function generateCode(number, radius, layerNumber) {
    var angle;
    var translateX;
    var translateY;
    const animationName =
        layerNumber == 1 ? 'rotate-spinner' : 'rotate-spinner-inverse';
    var htmlCode = '<div class="spinner-container">\n';
    var cssCode =
        layerNumber == 1
            ? `.spinner-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    animation: ${animationName} 1s linear 0s infinite;
    width: 100px;
    height: 100px;
    border-radius: 50%;
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
}`
            : `.spinner-container:nth-child(2) {
    animation: ${animationName} 2s linear 0s infinite;   
}`;
    cssCode += `@keyframes ${animationName} {
    100% {
        transform: rotate(${layerNumber == 1 ? '-' : ''}360deg);
    }
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
        var useAnimation = `.spinner-container:nth-child(${layerNumber}) .spinner:nth-child(${index}) {
    ${transform}
}`;
        cssCode += useAnimation + '\n';
        htmlCode += '   <div class="spinner"></div>\n';
    }
    htmlCode += '</div>\n';
    return { html: htmlCode, css: cssCode };
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numberRegex = /[1-9][0-9]*/;
const numberRegexAccepts0 = /[0-9]+/;
const widthInput = document.getElementById('width');
const lengthInput = document.getElementById('length');
const radiusInput = document.getElementById('radius');
const directionInput = document.getElementById('direction');
const preview = document.getElementById('preview');
const code = document.getElementById('code');
const inputs = document.getElementById('inputs');
const htmlCode = `<div class="arrow-container">
    <div class="arrow left">
        <div class="circle"></div>
        <div class="branch"></div>
        <div class="circle center"></div>
    </div>
    <div class="arrow right">
        <div class="branch"></div>
        <div class="circle"></div>
        <div class="circle center"></div>
    </div>
</div>`;
if (inputs) {
    inputs.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            generateBouncingArrow();
        }
    });
}
function generateBouncingArrow() {
    // debugger;
    if (!!widthInput && !!lengthInput && !!radiusInput && !!directionInput) {
        const w = widthInput.value;
        const l = lengthInput.value;
        const r = radiusInput.value;
        const d = directionInput.value;
        if (!!w && !!l && !!r && !!d) {
            const inputValid = checkInputs([w, l, r]) && !!d && d.match(numberRegexAccepts0);
            if (inputValid) {
                const width = parseInt(w);
                const length = parseInt(l);
                const radius = parseInt(r) % 180;
                const direction = parseInt(d);
                if (parseInt(l) / parseInt(w) >= 2) {
                    var codes = generateCode(width, length, radius, -direction);
                    if (!!preview && !!code) {
                        preview.innerHTML = `${codes.html}\n<style>${codes.css}</style>`;
                        code.innerHTML =
                            `${codes.html}\n<style>\n${codes.css}</style>`.replace('\n', '&#013; &#010;');
                    }
                }
            }
        }
    }
}
function checkInputs(inputs) {
    var valid = true;
    inputs.forEach((element) => {
        if (!element || !element.match(numberRegex)) {
            valid = false;
        }
    });
    return valid;
}
function generateCode(width, length, radius, direction) {
    const angle = (Math.PI * radius) / 360;
    const directionAngle = (Math.PI * direction) / 180;
    const translate = (Math.sin(angle) * length) / 2;
    const trans = Math.sin(angle) * width;
    var translateY = Math.cos(directionAngle) * 30;
    var translateX = Math.sin(-directionAngle) * 30;
    translateX = Math.abs(translateX) < 0.001 ? 0 : translateX;
    translateY = Math.abs(translateY) < 0.001 ? 0 : translateY;
    var cssCode = `.arrow-container {
        animation-duration: 1s;
        animation-name: bounceUpDown;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        transform: rotate(${-direction}deg)
    }
    .arrow {
        position: absolute;
        width: ${width}px;
        height: ${length}px;
    }
    .circle {
        position: absolute;
        width: ${width}px;
        height: ${width}px;
        border-radius: 50%;
        background-color: #fff;
        transform: translateY(-${width / 2}px);
    }
    .circle.center {
        transform: translateY(${length - width - width / 2}px);
    }
    .branch {
        position: absolute;
        width: ${width}px;
        height: ${length - width}px;
        background-color: #fff;
    }
    .arrow.left {
        transform: translateX(${translate - trans - width / 2}px) rotate(${radius / 2}deg);
    }
    .arrow.right {
        transform: translateX(-${translate - trans + width / 2}px) rotate(-${radius / 2}deg);
    }
    
    @keyframes bounceUpDown {
        from {
            transform: translate(0) rotate(${direction}deg);
        }
      
        to {
            transform: translate(${translateX}px, ${translateY}px) rotate(${direction}deg);
        }
    }`;
    return { html: htmlCode, css: cssCode };
}

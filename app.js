const main = document.querySelector('main');
const container = document.querySelector('.container');
const p = document.querySelectorAll('p');
const hexCode = document.querySelector('#hex-code');
const rgbCode = document.querySelector('#rgb-code');
const hslCode = document.querySelector('#hsl-code');
const modal = document.querySelector('.modal');
const colorName = document.querySelector('#color-name'); 
const btn = document.querySelector('#color-change-btn');


const hslToRGB = (h, s, l) => {
    // Must be fractions of 1
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return { r, g, b };
}

const rgbToHex = (r, g, b) => {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;

    return "#" + r + g + b;
}


const randomColor = () => {
    const h = Math.floor(Math.random() * 361);
    const s = Math.floor(Math.random() * 101);
    const l = Math.floor(Math.random() * 101);

    const rgbColor = hslToRGB(h, s, l);
    const hexColor = rgbToHex(rgbColor.r, rgbColor.g, rgbColor.b)
    return {
        hsl: { h, s, l },
        rgb: rgbColor,
        hex: hexColor
    }
}

function getContrastingColor(r, g, b){
    let contrastingColor = ((r*299)+(g*587)+(b*114))/1000;
	return (contrastingColor >= 128) ? '#000000' : '#FFFFFF';
}



btn.addEventListener('click', () => {
    const rgb = randomColor().rgb;
    const hsl = randomColor().hsl;
    const hexColor = randomColor().hex;
    const rgbColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    const hslColor = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

    main.style.backgroundColor = hslColor;
    container.style.backgroundColor = getContrastingColor(rgb.r, rgb.g, rgb.b);
    modal.style.backgroundColor = getContrastingColor(rgb.r, rgb.g, rgb.b);
    p.forEach(p => p.style.color = hslColor);

    const n_match = ntc.name(hexColor);
    const n_name = n_match[1];
    colorName.innerText = n_name;
    modal.style.transform = 'translateY(100%)';


    hexCode.innerText = `${hexColor.toUpperCase()}`;
    rgbCode.innerText = rgbColor;
    hslCode.innerText = hslColor;

    btn.style.color = hslColor;
    btn.style.borderColor = hslColor;
});

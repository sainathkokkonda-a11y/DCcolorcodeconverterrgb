function hexToRgb(hex) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    if (c.length !== 6) return null;
    let num = parseInt(c, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function convertColor() {
    let hex = document.getElementById('hex-input').value.trim();
    if (!hex.startsWith('#')) hex = '#' + hex;

    let rgb = hexToRgb(hex);
    if (rgb) {
        let hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        document.getElementById('rgb-res').innerText = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        document.getElementById('hsl-res').innerText = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        document.getElementById('preview-box').style.backgroundColor = hex;
        document.getElementById('preview-text').innerText = hex.toUpperCase();
        document.getElementById('color-picker').value = hex.length === 7 ? hex : '#1565c0';
    } else {
        document.getElementById('rgb-res').innerText = 'Invalid HEX';
        document.getElementById('hsl-res').innerText = 'Invalid HEX';
    }
}

function syncFromPicker(val) {
    document.getElementById('hex-input').value = val.toUpperCase();
    convertColor();
}

function copyToClipboard(elementId) {
    let text = document.getElementById(elementId).innerText;
    if (text && !text.includes('Invalid')) {
        navigator.clipboard.writeText(text);
        alert('Copied: ' + text);
    }
}

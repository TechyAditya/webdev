const button = document.querySelector('button');
const h1 = document.querySelector('h1');
button.addEventListener('click', () => {
    const color = makeRandomColor();
    document.body.style.backgroundColor = color;
    h1.innerText = color;
});

const makeRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

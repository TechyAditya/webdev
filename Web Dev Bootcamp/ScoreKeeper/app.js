const p1b = document.querySelector('#p1b');
const p2b = document.querySelector('#p2b');
const p1s = document.querySelector('#p1s');
const p2s = document.querySelector('#p2s');
const resetbtn = document.querySelector('#reset');
const winScoreSelect = document.querySelector('#playto');

let p1Score = 0;
let p2Score = 0;
let win = 3;
let isGameOver = false;

p1b.addEventListener('click', function () {
    if (!isGameOver) {
        if (p1Score !== win) {
            p1Score++;
            if (p1Score === win) {
                isGameOver = true;
                p1s.classList.add('winner');
                p2s.classList.add('loser');
            }
            p1s.textContent = p1Score;
        }
    }
});

p2b.addEventListener('click', function () {
    if (!isGameOver) {
        if (p2Score !== win) {
            p2Score++;
            if (p2Score === win) {
                isGameOver = true;
                p2s.classList.add('winner');
                p1s.classList.add('loser');
            }
            p2s.textContent = p2Score;
        }
    }
});

function reset() {
    p1Score = 0;
    p2Score = 0;
    p1s.textContent = p1Score;
    p2s.textContent = p2Score;
    isGameOver = false;
    p1s.classList.remove('winner', 'loser');
    p2s.classList.remove('winner', 'loser');

}

winScoreSelect.addEventListener('change', function () {
    win = Number(winScoreSelect.value);
    reset();
});

resetbtn.addEventListener('click', reset);

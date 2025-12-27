// script.js

const countdownEl = document.getElementById('countdown-timer');
const kloraEl = document.getElementById('klora');
const randomTextEl = document.getElementById('random-text');
const weeklyTotalEl = document.getElementById('weekly-total');
const navbar = document.getElementById('navbar');
const drinkBtn = document.getElementById('drink-btn');
const dailyTotalEl = document.getElementById('daily-total');

const texts = [
    "Ayo minum air dulu!",
    "Klora senang kamu datang~",
    "Setiap teguk menyehatkan!",
    "Jangan lupa hidrasi ya~",
    "Tubuhmu butuh kamu minum ✨",
    "Minum bisa bikin segar lho!",
    "Kita kejar 8 gelas hari ini!",
    "Selamat datang kembali!",
    "Waktunya minum!",
    "Air putih adalah terbaik 💧",
    "Klora bangga sama kamu!",
    "Istirahat bentar, minum dulu~"
];

const STORAGE_DAILY = 'daily_drink';
const STORAGE_WEEKLY = 'weekly_drink';
const STORAGE_DATE = 'last_date';
const STORAGE_NEXT_TIME = 'next_drink_time';

function updateDailyDisplay() {
    const daily = parseInt(localStorage.getItem(STORAGE_DAILY)) || 0;
    dailyTotalEl.textContent = daily;
}

function resetDailyIfNewDay() {
    const today = new Date().toDateString();
    const last = localStorage.getItem(STORAGE_DATE);

    if (last !== today) {
        localStorage.setItem(STORAGE_DAILY, 0);
        localStorage.setItem(STORAGE_DATE, today);
    }
}

function getWeeklyTotal() {
    return parseInt(localStorage.getItem(STORAGE_WEEKLY)) || 0;
}

function updateWeeklyDisplay() {
    weeklyTotalEl.textContent = getWeeklyTotal();
}


function setNextDrinkTime() {
    const nextTime = Date.now() + (2 * 60 * 60 * 1000); // 2 jam interval
    localStorage.setItem(STORAGE_NEXT_TIME, nextTime);
}

function updateCountdown() {
    const nextTime = parseInt(localStorage.getItem(STORAGE_NEXT_TIME)) || Date.now();
    const diff = nextTime - Date.now();

    if (diff <= 0) {
        countdownEl.textContent = "Saatnya minum!";
        return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}

function startTextAnimation() {
    function changeText() {
        const randomText = texts[Math.floor(Math.random() * texts.length)];
        randomTextEl.textContent = randomText;

        const duration = 2000 + Math.random() * 3000;
        setTimeout(changeText, duration);
    }
    changeText();
}

function animateKlora() {
    const rect = kloraEl.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        kloraEl.classList.add('visible');
        window.removeEventListener('scroll', animateKlora);
    }
}

function checkNavbar() {
    if (window.scrollY > 50) {
        navbar.classList.add('show');
    } else {
        navbar.classList.remove('show');
    }
}

function handleDrink() {
    let daily = parseInt(localStorage.getItem(STORAGE_DAILY)) || 0;
    let weekly = parseInt(localStorage.getItem(STORAGE_WEEKLY)) || 0;

    daily++;
    weekly++;

    // Simpan data
    localStorage.setItem(STORAGE_DAILY, daily);
    localStorage.setItem(STORAGE_WEEKLY, weekly);

    updateDailyDisplay();
    updateWeeklyDisplay();

    // Reset harian progress jika mencapai 8
    if (daily >= 8) {
        localStorage.setItem(STORAGE_DAILY, 0);
        updateDailyDisplay();
    }

    // Reset mingguan progress jika mencapai 56
    if (weekly >= 56) {
        localStorage.setItem(STORAGE_WEEKLY, 0);
        updateWeeklyDisplay();
    }

    setNextDrinkTime();
    disableDrinkButton();
}

function disableDrinkButton() {
    const next = parseInt(localStorage.getItem(STORAGE_NEXT_TIME)) || 0;
    drinkBtn.disabled = next > Date.now();
}

drinkBtn.addEventListener('click', handleDrink);
setInterval(disableDrinkButton, 1000);
disableDrinkButton();

resetDailyIfNewDay();
updateDailyDisplay();
updateWeeklyDisplay();

if (!localStorage.getItem(STORAGE_NEXT_TIME)) {
    setNextDrinkTime();
}

setInterval(updateCountdown, 1000);
startTextAnimation();

window.addEventListener('scroll', animateKlora);
window.addEventListener('scroll', checkNavbar);

animateKlora();
checkNavbar();

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.classList.add("fade-out");
    }, 500);
});

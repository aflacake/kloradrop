// acara.js

const navbar = document.getElementById('navbar');

function checkNavbar() {
    if (window.scrollY > 50) {
        navbar.classList.add('show');
    } else {
        navbar.classList.remove('show');
    }
}

window.addEventListener('scroll', checkNavbar);

checkNavbar();

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.classList.add("fade-out");
    }, 500);
});

const funFacts = [
    "Tubuh manusia terdiri dari 60% air.",
    "Minum air dapat meningkatkan konsentrasi dan memori.",
    "Air membantu menjaga suhu tubuh tetap stabil.",
    "Dehidrasi ringan bisa menyebabkan sakit kepala dan lelah.",
    "Air dapat membantu pencernaan tetap lancar.",
    "Minum cukup air meningkatkan kesehatan kulit.",
    "Otak terdiri dari 75% air — jadi minum air itu penting!",
    "Rasa haus adalah tanda tubuh mulai mengalami dehidrasi."
];

const factElement = document.getElementById('fun-fact-text');

function showRandomFact() {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    const fact = funFacts[randomIndex];
    factElement.textContent = fact;

    const wordCount = fact.split(" ").length;
    const duration = Math.max(3000, wordCount * 250);
    setTimeout(showRandomFact, duration);
}

document.addEventListener("DOMContentLoaded", () => {
    showRandomFact();
});

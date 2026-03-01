window.Telegram.WebApp.ready();
window.Telegram.WebApp.expand();

let selectedTime = 0;
let gameLabel = "";

// Continue button
document.getElementById("start-btn").addEventListener("click", () => {
    selectedTime = document.getElementById("time-select").value;

    if (!selectedTime) return;

    if (selectedTime == "30") gameLabel = "WinGo 30 Sec";
    if (selectedTime == "60") gameLabel = "WinGo 1 Min";
    if (selectedTime == "180") gameLabel = "WinGo 3 Min";
    if (selectedTime == "300") gameLabel = "WinGo 5 Min";

    document.getElementById("game-name").textContent = gameLabel;
    document.getElementById("period-number").textContent = generatePeriod();

    document.getElementById("screen1").classList.remove("active");
    document.getElementById("screen2").classList.add("active");
});

// Generate Realistic Period Number (DMWin Style)
function generatePeriod() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    // Base game code like DMWin style
    let gameCode = "1000";

    // Round counter based on seconds/time
    let round;
    if (selectedTime == 30) {
        round = Math.floor(now.getSeconds() / 30);
    } else if (selectedTime == 60) {
        round = now.getMinutes();
    } else if (selectedTime == 180) {
        round = Math.floor(now.getMinutes() / 3);
    } else {
        round = Math.floor(now.getMinutes() / 5);
    }

    const random = Math.floor(Math.random() * 999).toString().padStart(3, '0');

    return `${year}${month}${day}${gameCode}${round}${random}`;
}

// Get Signal Button
document.getElementById("get-signal").addEventListener("click", () => {
    document.getElementById("get-signal").style.display = "none";
    document.getElementById("processing").style.display = "flex";

    setTimeout(() => step(1), 800);
    setTimeout(() => step(2), 1600);
    setTimeout(() => step(3), 2400);
    setTimeout(() => step(4), 3200);
    setTimeout(showSignal, 4200);
});

function step(n) {
    document.getElementById(`step${n}`).classList.add("done");
}

function showSignal() {
    document.getElementById("processing").style.display = "none";

    const result = Math.random() > 0.5 ? "BIG" : "SMALL";

    document.getElementById("final-game").textContent = gameLabel;
    document.getElementById("final-period").textContent = generatePeriod();

    const dir = document.getElementById("signal-direction");
    dir.textContent = result;
    dir.className = result === "BIG" ? "green" : "red";

    document.getElementById("signal-card").style.display = "block";
}

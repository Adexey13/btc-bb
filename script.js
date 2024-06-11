let energy = 100;
let isTapping = false;
let tapInterval;
let restoreInterval;
const btcRate = 0.00004478 / 25 / 60;  // Adjusted for per second tap

function startTapping() {
    if (!isTapping) {
        isTapping = true;
        tapInterval = setInterval(updateBalance, 1000);  // Tapping every second
    }
}

function stopTapping() {
    isTapping = false;
    clearInterval(tapInterval);
    restoreEnergy();
}

function updateBalance() {
    if (energy > 0) {
        const btcAmountElement = document.querySelector('.btc-amount');
        let currentBalance = parseFloat(btcAmountElement.textContent);
        currentBalance += btcRate;  // Increment balance
        btcAmountElement.textContent = currentBalance.toFixed(8);

        energy -= 4;  // Reduce energy (e.g., 4% per second)
        updateEnergyBar();
    } else {
        stopTapping();
    }
}

function updateEnergyBar() {
    const energyElement = document.querySelector('.energy');
    const progressElement = document.querySelector('.progress');
    energyElement.textContent = `Energy: ${energy}%`;
    progressElement.style.width = `${energy}%`;

    if (energy <= 0) {
        stopTapping();
    }
}

function restoreEnergy() {
    clearInterval(restoreInterval);
    restoreInterval = setInterval(() => {
        if (!isTapping && energy < 100) {
            energy += 1;  // Restore 1% energy per second
            updateEnergyBar();
        } else if (energy >= 100) {
            clearInterval(restoreInterval);
        }
    }, 1000);
}

function inviteFriends() {
    const referralLink = "https://t.me/YourBot?start=referral_code";  // Replace with actual bot link
    alert(`Invitation link generated: ${referralLink}`);
    // Simulate adding a new referral
    addReferral('NewUser', '0.00000896');
}

function addReferral(name, amount) {
    const referrals = document.getElementById('referrals');
    const referral = document.createElement('div');
    referral.className = 'referral';
    referral.innerHTML = `<span>${name}</span><span>${amount} BTC</span>`;
    referrals.appendChild(referral);
    referrals.classList.remove('hidden');
}

// Add event listeners for mouse and touch events
const btcLogo = document.querySelector('.btc-logo');
btcLogo.addEventListener('mousedown', startTapping);
btcLogo.addEventListener('mouseup', stopTapping);
btcLogo.addEventListener('mouseleave', stopTapping);
btcLogo.addEventListener('touchstart', startTapping);
btcLogo.addEventListener('touchend', stopTapping);

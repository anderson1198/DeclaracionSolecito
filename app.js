// Create floating hearts in background
function createFloatingHearts() {
    const heartContainer = document.getElementById('heartContainer');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💝', '💓'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '-50px';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.pointerEvents = 'none';
        heart.style.animation = `floatUp ${Math.random() * 3 + 4}s linear`;

        heartContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 7000);
    }, 500);
}

// Add floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.8;
        }
        90% {
            opacity: 0.8;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize app
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionCard = document.getElementById('questionCard');
const successCard = document.getElementById('successCard');

let noClickAttempts = 0;

// Handle Yes button
yesBtn.addEventListener('click', () => {
    // Enviar notificación por email
    sendEmailNotification();

    questionCard.style.animation = 'cardEntrance 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) reverse';

    setTimeout(() => {
        questionCard.style.display = 'none';
        successCard.style.display = 'block';
        createConfetti();
    }, 500);
});

// Función para enviar notificación por email
async function sendEmailNotification() {
    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        if (data.success) {
            console.log('✅ Notificación enviada exitosamente!');
        } else {
            console.error('❌ Error al enviar notificación:', data.error);
        }
    } catch (error) {
        console.error('❌ Error al enviar notificación:', error);
    }
}

// Handle No button - make it move away
noBtn.addEventListener('mouseover', (e) => {
    moveNoButton();
});

noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Handle touch events for mobile
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

function moveNoButton() {
    noClickAttempts++;

    const btnRect = noBtn.getBoundingClientRect();

    // Use viewport dimensions for full screen movement
    const maxX = window.innerWidth - btnRect.width - 40;
    const maxY = window.innerHeight - btnRect.height - 40;

    // Generate random position anywhere on screen
    let newX = Math.random() * maxX + 20;
    let newY = Math.random() * maxY + 20;

    // Make sure it's far enough from current position (increased minimum distance)
    const currentX = parseFloat(noBtn.style.left || 0);
    const currentY = parseFloat(noBtn.style.top || 0);

    const distance = Math.sqrt(Math.pow(newX - currentX, 2) + Math.pow(newY - currentY, 2));

    // If too close, generate new position far away
    if (distance < 200) {
        newX = (newX + maxX / 2) % maxX;
        newY = (newY + maxY / 2) % maxY;
    }

    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';

    // Increase yes button size with each attempt
    const newScale = 1 + (noClickAttempts * 0.1);
    yesBtn.style.transform = `scale(${newScale})`;

    // Add shake animation to no button
    noBtn.style.animation = 'shake 0.3s';
    setTimeout(() => {
        noBtn.style.animation = '';
    }, 300);
}

// Add shake animation
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(shakeStyle);

// Create confetti effect
function createConfetti() {
    const colors = ['#f093fb', '#f5576c', '#feca57', '#48dbfb', '#ff9ff3'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.zIndex = '1000';
            confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear`;

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 30);
    }
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Start floating hearts
createFloatingHearts();

// Initialize no button position - start it further from the Yes button
window.addEventListener('load', () => {
    noBtn.style.position = 'fixed';
    noBtn.style.left = 'auto';
    noBtn.style.right = '100px';
    noBtn.style.top = 'auto';
    noBtn.style.bottom = '200px';
    noBtn.style.zIndex = '10';
});

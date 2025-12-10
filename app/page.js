'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Home() {
    const [showSuccess, setShowSuccess] = useState(false);
    const [noPosition, setNoPosition] = useState({ left: 'auto', right: '100px', top: 'auto', bottom: '200px' });
    const [noClickAttempts, setNoClickAttempts] = useState(0);
    const [yesScale, setYesScale] = useState(1);

    useEffect(() => {
        // Create floating hearts
        const heartContainer = document.getElementById('heartContainer');
        const heartSymbols = ['❤️', '💕', '💖', '💗', '💝', '💓'];

        const interval = setInterval(() => {
            if (heartContainer) {
                const heart = document.createElement('div');
                heart.style.position = 'absolute';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.bottom = '-50px';
                heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
                heart.style.opacity = String(Math.random() * 0.5 + 0.3);
                heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
                heart.style.pointerEvents = 'none';
                heart.style.animation = `floatUp ${Math.random() * 3 + 4}s linear`;

                heartContainer.appendChild(heart);

                setTimeout(() => {
                    heart.remove();
                }, 7000);
            }
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const handleYesClick = async () => {
        // Send email notification
        try {
            await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('✅ Notificación enviada exitosamente!');
        } catch (error) {
            console.error('❌ Error al enviar notificación:', error);
        }

        // Show success card
        setShowSuccess(true);
        createConfetti();
    };

    const moveNoButton = () => {
        const newAttempts = noClickAttempts + 1;
        setNoClickAttempts(newAttempts);

        const maxX = window.innerWidth - 200;
        const maxY = window.innerHeight - 80;

        let newX = Math.random() * maxX + 20;
        let newY = Math.random() * maxY + 20;

        const currentX = parseFloat(String(noPosition.left) || '0');
        const currentY = parseFloat(String(noPosition.top) || '0');

        const distance = Math.sqrt(Math.pow(newX - currentX, 2) + Math.pow(newY - currentY, 2));

        if (distance < 200) {
            newX = (newX + maxX / 2) % maxX;
            newY = (newY + maxY / 2) % maxY;
        }

        setNoPosition({ left: `${newX}px`, top: `${newY}px`, right: 'auto', bottom: 'auto' });
        setYesScale(1 + (newAttempts * 0.1));
    };

    const createConfetti = () => {
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
    };

    return (
        <>
            <div className={styles.background}>
                <div className={styles.heartContainer} id="heartContainer"></div>
            </div>

            <main className={styles.container}>
                {!showSuccess ? (
                    <div className={styles.card}>
                        <div className={styles.sunContainer}>
                            <img src="/solecito.svg" alt="Solecito" className={styles.sunIcon} />
                        </div>
                        <h1 className={styles.title}>Hola Angie 💕</h1>
                        <div className={styles.questionContainer}>
                            <p className={styles.question}>
                                ¿Te gustaría salir conmigo? Déjame ser el{' '}
                                <span style={{ color: 'rgb(237, 163, 5)' }}>SOLECITO</span> que le dé luz a tus días.
                            </p>
                            <div className={styles.emoji}>😊✨</div>
                        </div>

                        <div className={styles.buttonsContainer}>
                            <button
                                className={`${styles.btn} ${styles.btnYes}`}
                                onClick={handleYesClick}
                                style={{ transform: `scale(${yesScale})` }}
                            >
                                <span className={styles.btnText}>¡Sí! 💖</span>
                            </button>
                            <button
                                className={`${styles.btn} ${styles.btnNo}`}
                                onMouseEnter={moveNoButton}
                                onClick={(e) => { e.preventDefault(); moveNoButton(); }}
                                onTouchStart={(e) => { e.preventDefault(); moveNoButton(); }}
                                style={{ ...noPosition }}
                            >
                                <span className={styles.btnText}>No</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={`${styles.card} ${styles.successCard}`}>
                        <div className={styles.celebration}>🎉</div>
                        <h1 className={styles.successTitle}>¡Qué felicidad! 💕</h1>
                        <p className={styles.successMessage}>No sabes lo feliz que me hace tu respuesta ✨</p>
                        <p className={styles.successMessage}>¡Será el inicio de algo increíble! 🌟</p>
                        <div className={styles.heartsCelebration}>
                            <span className={styles.heart}>❤️</span>
                            <span className={styles.heart}>💖</span>
                            <span className={styles.heart}>💕</span>
                            <span className={styles.heart}>💗</span>
                            <span className={styles.heart}>💝</span>
                        </div>
                    </div>
                )}
            </main>

            {/* Version indicator */}
            <div className={styles.version}>v1.0</div>
        </>
    );
}

<script setup lang="ts">
import { ref, inject, type Ref, onMounted, onUnmounted } from 'vue';
import { useAudio } from '../composables/useAudio';
import type { PortfolioData } from '../utils/contentParser';

const emit = defineEmits<{
    start: [];
}>();

const portfolioData = inject<Ref<PortfolioData | null>>('portfolioData');
const { playClick, initAudio } = useAudio();

const showPressStart = ref(true);
const isStarting = ref(false);

let blinkInterval: number | undefined;

const handleStart = () => {
    initAudio();
    playClick();
    isStarting.value = true;

    setTimeout(() => {
        emit('start');
    }, 800);
};

// Handle keyboard
const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
        handleStart();
    }
};

const innerWidth = ref<number>(window.innerWidth);

const handleResize = () => {
  innerWidth.value = window.innerWidth;
};

onMounted(() => {
    // Blink effect for "Press Start"
    blinkInterval = window.setInterval(() => {
        showPressStart.value = !showPressStart.value;
    }, 700);

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('resize', handleResize);

});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('resize', handleResize);

    if (blinkInterval) {
        window.clearInterval(blinkInterval);
    }
});
</script>

<template>
    <div class="start-screen" :class="{ 'is-starting': isStarting }">
        <div class="content-wrapper">
            <!-- Game Title -->
            <div class="title-section">
                <!-- AI IMAGE PROMPT:
        Pixel art game logo, glowing neon text effect, "ISHANT.DEV" in
        retro arcade game title style, purple and cyan neon glow,
        16-bit typography with chrome/metallic shine effect
        -->
                <h1 class="game-title">
                    <span class="title-line title-small">WELCOME TO</span>
                    <span v-if="innerWidth < 768" class="title-line title-main neon-text-cyan">ISH4NT.DEV</span>
                    <img v-else src="/pixil-frame-0.png" alt="title" class="title-line title-main neon-text-cyan" />
                    <div style="padding: 0.3em; background-color: #00000055;">

                        <span class="title-line title-subtitle neon-text-pink">PORTFOLIO QUEST</span>
                    </div>
                </h1>

                <!-- Subtitle -->
                <p class="game-subtitle pixel-text-sm">
                    {{
                        portfolioData?.hero?.positioning ||
                        'Building intelligent systems at the intersection of AI, software engineering, and embedded technology.'
                    }}
                </p>
            </div>

            <!-- Character Preview -->
            <div class="character-preview">
                <!-- AI IMAGE PROMPT:
        Pixel art developer character sprite, 16-bit RPG hero style,
        young male developer with laptop, purple hoodie, standing pose,
        retro game character design, idle animation frames
        -->
                <img src="/avatar.png" alt="avatar" class="character-sprite"></img>
                <div class="character-shadow"></div>
            </div>

            <!-- Specialization Tags -->
            <div class="tags-section">
                <div v-for="(tag, index) in portfolioData?.hero?.tags || []" :key="index" class="spec-tag hud-element"
                    :style="{ animationDelay: `${index * 0.2}s` }">
                    <span class="tag-icon">◆</span>
                    {{ tag }}
                </div>
            </div>

            <!-- Press Start Button -->
            <div class="start-section">
                <button class="start-button" :class="{ 'blink': showPressStart }" @click="handleStart">
                    <span class="button-text">▶ PRESS START ◀</span>
                </button>

                <p class="hint-text pixel-text-xs">
                    Press ENTER or Click to Begin
                </p>
            </div>

            <!-- Version Info -->
            <div class="version-info pixel-text-xs">
                <span>v2024.1.0</span>
                <span class="separator">|</span>
                <span>© {{ new Date().getFullYear() }} {{ portfolioData?.hero?.name || 'Ishant Kumar' }}</span>
            </div>
        </div>

        <!-- Decorative Elements -->
        <div class="corner-decoration top-left"></div>
        <div class="corner-decoration top-right"></div>
        <div class="corner-decoration bottom-left"></div>
        <div class="corner-decoration bottom-right"></div>

        <!-- Scan Line Animation -->
        <div class="scan-line"></div>
    </div>
</template>

<style scoped>
.start-screen {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    position: relative;
    transition: all 0.5s ease;
}

.start-screen.is-starting {
    filter: brightness(2);
    transform: scale(1.1);
}

.content-wrapper {
    text-align: center;
    max-width: 800px;
    position: relative;
    z-index: 10;
}

/* Title Section */
.title-section {
    margin-bottom: 30px;
}

.game-title {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}

.title-line {
    display: block;
    letter-spacing: 4px;
}

.title-small {
    font-size: 12px;
    color: var(--color-text-secondary);
    animation: fadeInDown 0.5s ease;
}

.title-main {
    font-size: 48px;
    text-shadow:
        0 0 10px var(--color-neon-cyan),
        0 0 20px var(--color-neon-cyan),
        0 0 40px var(--color-neon-cyan),
        0 4px 0 #004040;
    animation: titleGlow 2s ease-in-out infinite, fadeInDown 0.7s ease;
}

.title-subtitle {
    font-size: 18px;
    letter-spacing: 8px;
    animation: fadeInDown 0.9s ease;
}

.game-subtitle {
    color: var(--color-text-secondary);
    max-width: 500px;
    margin: 0 auto;
    line-height: 1.8;
    animation: fadeIn 1s ease;
}

@keyframes titleGlow {

    0%,
    100% {
        text-shadow:
            0 0 10px var(--color-neon-cyan),
            0 0 20px var(--color-neon-cyan),
            0 0 40px var(--color-neon-cyan),
            0 4px 0 #004040;
    }

    50% {
        text-shadow:
            0 0 20px var(--color-neon-cyan),
            0 0 40px var(--color-neon-cyan),
            0 0 60px var(--color-neon-cyan),
            0 0 80px rgba(0, 255, 255, 0.5),
            0 4px 0 #004040;
    }
}

/* Character Preview */
.character-preview {
    position: relative;
    height: 120px;
    margin: 30px auto;
    animation: float 3s ease-in-out infinite;
}

.character-sprite {
    width: 64px;
    height: auto;
    margin: 0 auto;
    background: linear-gradient(180deg,
            #2d1b4e 0%,
            #4a2c7a 20%,
            #6a3d9a 40%,
            #9d4edd 60%,
            #4a2c7a 80%,
            #2d1b4e 100%);
    border: 3px solid var(--color-neon-purple);
    box-shadow:
        0 0 10px var(--color-neon-purple),
        inset 0 0 20px rgba(157, 78, 221, 0.3);
    border-radius: 4px;
    position: relative;
}

.character-sprite::before {
    content: '👨‍💻';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 40px;
}

.character-shadow {
    width: 50px;
    height: 15px;
    margin: 10px auto 0;
    background: radial-gradient(ellipse, rgba(0, 0, 0, 0.5) 0%, transparent 70%);
    animation: shadowPulse 3s ease-in-out infinite;
}

@keyframes shadowPulse {

    0%,
    100% {
        transform: scaleX(1);
        opacity: 0.5;
    }

    50% {
        transform: scaleX(0.8);
        opacity: 0.3;
    }
}

/* Tags Section */
.tags-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    margin: 30px 0;
}

.spec-tag {
    font-size: 9px;
    padding: 8px 16px;
    animation: slideInUp 0.5s ease backwards;
}

.tag-icon {
    color: var(--color-neon-purple);
    margin-right: 8px;
}

/* Start Button */
.start-section {
    margin-top: 40px;
}

.start-button {
    font-family: var(--font-pixel);
    font-size: 16px;
    padding: 20px 50px;
    background: transparent;
    border: 4px solid var(--color-neon-cyan);
    color: var(--color-neon-cyan);
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease;
    text-shadow: 0 0 10px var(--color-neon-cyan);
    box-shadow:
        0 0 20px rgba(0, 255, 255, 0.3),
        inset 0 0 20px rgba(0, 255, 255, 0.1);
}

.start-button:hover {
    background: rgba(0, 255, 255, 0.1);
    box-shadow:
        0 0 30px rgba(0, 255, 255, 0.5),
        inset 0 0 30px rgba(0, 255, 255, 0.2);
    transform: scale(1.05);
}

.start-button.blink .button-text {
    opacity: 1;
}

.start-button:not(.blink) .button-text {
    opacity: 0.3;
}

.button-text {
    transition: opacity 0.1s ease;
}

.hint-text {
    margin-top: 20px;
    color: var(--color-text-secondary);
    animation: blink 1.5s ease-in-out infinite;
}

/* Version Info */
.version-info {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: var(--color-text-secondary);
    opacity: 0.6;
}

.separator {
    margin: 0 10px;
    color: var(--color-neon-purple);
}

/* Corner Decorations */
.corner-decoration {
    position: fixed;
    width: 60px;
    height: 60px;
    border: 3px solid var(--color-neon-purple);
    opacity: 0.5;
}

.top-left {
    top: 20px;
    left: 20px;
    border-right: none;
    border-bottom: none;
}

.top-right {
    top: 20px;
    right: 20px;
    border-left: none;
    border-bottom: none;
}

.bottom-left {
    bottom: 20px;
    left: 20px;
    border-right: none;
    border-top: none;
}

.bottom-right {
    bottom: 20px;
    right: 20px;
    border-left: none;
    border-top: none;
}

/* Scan Line */
.scan-line {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent);
    animation: scanDown 4s linear infinite;
    pointer-events: none;
    z-index: 100;
}

@keyframes scanDown {
    0% {
        top: 0;
        opacity: 0;
    }

    10% {
        opacity: 1;
    }

    90% {
        opacity: 1;
    }

    100% {
        top: 100%;
        opacity: 0;
    }
}

/* Animations */
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive */
@media (max-width: 768px) {
    .title-main {
        font-size: 28px;
        letter-spacing: 2px;
    }

    .title-subtitle {
        font-size: 12px;
        letter-spacing: 4px;
    }

    .start-button {
        font-size: 12px;
        padding: 16px 30px;
    }

    .spec-tag {
        font-size: 7px;
        padding: 6px 10px;
    }

    .corner-decoration {
        width: 30px;
        height: 30px;
    }
}

@media (max-width: 480px) {
    .title-main {
        font-size: 20px;
    }

    .title-subtitle {
        font-size: 10px;
        letter-spacing: 2px;
    }

    .tags-section {
        flex-direction: column;
        align-items: center;
    }
}
</style>

<script setup lang="ts">
import { inject, type Ref } from 'vue';
import type { PortfolioData } from '../utils/contentParser';
import { useAudio } from '../composables/useAudio';

const emit = defineEmits<{ back: [] }>();
const portfolioData = inject<Ref<PortfolioData | null>>('portfolioData');
const { playNavigate, playSelect } = useAudio();

const handleBack = () => {
    playNavigate();
    emit('back');
};

const open = (url: string) => {
    playSelect();
    window.open(url, '_blank', 'noopener,noreferrer');
};

const mailto = () => {
    const email = portfolioData?.value?.contact?.email || 'ishant9805@gmail.com';
    open(`mailto:${email}`);
};
</script>

<template>
    <section class="screen">
        <div class="hud-element title">
            <span class="neon-text-purple">CONTACT PORTAL</span>
        </div>
        <header class="top-hud">
            <button class="pixel-btn" @click="handleBack">BACK</button>
            <div class="hud-element">
                <span class="neon-text-cyan">PORTAL </span>
                <span class="pixel-text-xs">(ONLINE):</span>
                <span class="neon-text-green">YES</span>
            </div>


        </header>

        <div class="content game-panel">
            <div class="game-panel-title">TRANSMIT MESSAGE</div>

            <!-- AI IMAGE PROMPT:
      Pixel art sci-fi portal UI, circular neon gateway, cyberpunk HUD,
      purple/cyan energy ring, scanlines, 16-bit arcade style
      -->
            <div class="portal">
                <div class="ring"></div>
                <!-- <div class="core">✦</div> -->
                <img src="/profile.png" alt="profile picture" class="core"  width="145"/>
                <!-- <div class="core">📡</div> -->
            </div>

            <div class="cards">
                <div class="card">
                    <div class="label">EMAIL</div>
                    <div class="value terminal-text">{{ portfolioData?.contact.email }}</div>
                    <button class="pixel-btn pixel-btn-cyan" @click="mailto">SEND</button>
                </div>

                <div class="card">
                    <div class="label">LINKEDIN</div>
                    <div class="value terminal-text">{{ portfolioData?.contact.linkedin }}</div>
                    <button class="pixel-btn"
                        @click="open(portfolioData?.contact.linkedin || 'https://linkedin.com')">OPEN</button>
                </div>

                <div class="card">
                    <div class="label">GITHUB</div>
                    <div class="value terminal-text">
                        <div v-for="(g, i) in (portfolioData?.contact.github || [])" :key="i">{{ g }}</div>
                    </div>
                    <button class="pixel-btn"
                        @click="open('https://' + (portfolioData?.contact.github?.[0] || 'github.com/ishant9805').replace(/^https?:\/\//, ''))">
                        OPEN
                    </button>
                </div>
            </div>

            <!-- <div class="hint hud-element">
                <span class="pixel-text-xs">All contact data is loaded from about_me.txt</span>
            </div> -->
        </div>
    </section>
</template>

<style scoped>
.screen {
    min-height: 100vh;
    padding: 28px 18px 80px;
}

.top-hud {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    max-width: 1100px;
    margin: 0 auto 18px;
}

.title {
    flex: 1;
    text-align: center;
}

.content {
    max-width: 1100px;
    margin: 0 auto;
}

.portal {
    position: relative;
    height: 180px;
    display: grid;
    place-items: center;
    margin-top: 10px;
}

.ring {
    width: 160px;
    height: 160px;
    border-radius: 999px;
    border: 6px solid rgba(0, 255, 255, 0.5);
    box-shadow:
        0 0 24px rgba(0, 255, 255, 0.25),
        0 0 40px rgba(157, 78, 221, 0.25);
    animation: spin 5s linear infinite;
}

.core {
    position: absolute;
    font-size: 44px;
    color: var(--color-neon-purple);
    text-shadow: 0 0 20px rgba(157, 78, 221, 0.6);
    animation: pulse 1.6s ease-in-out infinite;
}

.cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
    margin-top: 18px;
}

.card {
    background: rgba(0, 0, 0, 0.35);
    border: 3px solid rgba(0, 255, 255, 0.25);
    padding: 14px;
    display: grid;
    gap: 10px;
}

.label {
    font-size: 10px;
    color: var(--color-neon-cyan);
    letter-spacing: 2px;
}

.value {
    color: var(--color-text-secondary);
    overflow-wrap: anywhere;
}

.hint {
    margin-top: 16px;
    text-align: center;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes pulse {

    0%,
    100% {
        transform: scale(1);
        opacity: 0.8;
    }

    50% {
        transform: scale(1.08);
        opacity: 1;
    }
}

@media (max-width: 980px) {
    .cards {
        grid-template-columns: 1fr;
    }
}
</style>

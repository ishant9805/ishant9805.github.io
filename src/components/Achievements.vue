<script setup lang="ts">
import { inject, type Ref } from 'vue';
import type { PortfolioData } from '../utils/contentParser';
import { useAudio } from '../composables/useAudio';

const emit = defineEmits<{ back: [] }>();
const portfolioData = inject<Ref<PortfolioData | null>>('portfolioData');
const { playNavigate, playAchievement } = useAudio();

const handleBack = () => {
    playNavigate();
    emit('back');
};

const playUnlock = () => {
    playAchievement();
};
</script>

<template>
    <section class="screen">
        <header class="top-hud">
            <div class="hud-element">
                <span class="neon-text-cyan">ACH</span>
                <span class="pixel-text-xs">BADGES</span>
                <span class="neon-text-pink">{{ portfolioData?.achievements?.length || 0 }}</span>
            </div>

            <div class="hud-element title">
                <span class="neon-text-purple">ACHIEVEMENTS</span>
            </div>

            <button class="pixel-btn" @click="handleBack">BACK</button>
        </header>

        <div class="content game-panel">
            <div class="game-panel-title">CERTIFICATIONS & AWARDS</div>

            <!-- AI IMAGE PROMPT:
      Pixel art achievement badge grid UI, 16-bit arcade trophies,
      neon purple/cyan borders, glowing badge icons, retro HUD style
      -->
            <div class="grid">
                <div v-for="(cat, idx) in (portfolioData?.achievements || [])" :key="idx" class="category">
                    <div class="cat-title neon-text-cyan">{{ cat.category }}</div>

                    <div class="badges">
                        <button v-for="(it, i) in cat.items" :key="i" class="badge" type="button" @click="playUnlock">
                            <!-- AI IMAGE PROMPT:
              Pixel art badge icon, 16-bit medal, neon glow, crisp pixel art
              -->
                            <span class="badge-icon">🏅</span>
                            <span class="badge-text">{{ it }}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="hint hud-element">
                <span class="pixel-text-xs">Click a badge to play an unlock SFX.</span>
            </div>
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

.grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    margin-top: 10px;
}

.category {
    background: rgba(0, 0, 0, 0.35);
    border: 3px solid rgba(157, 78, 221, 0.25);
    padding: 12px;
}

.cat-title {
    font-size: 12px;
    letter-spacing: 2px;
    margin-bottom: 10px;
}

.badges {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
}

.badge {
    font-family: var(--font-pixel);
    background: rgba(26, 26, 46, 0.45);
    border: 2px solid rgba(0, 255, 255, 0.25);
    color: var(--color-text-primary);
    padding: 10px;
    display: grid;
    grid-template-columns: 26px 1fr;
    gap: 10px;
    align-items: center;
    text-align: left;
    cursor: pointer;
    transition: all 0.12s ease;
}

.badge:hover {
    border-color: rgba(0, 255, 255, 0.75);
    box-shadow: 0 0 18px rgba(0, 255, 255, 0.2);
    transform: translateY(-1px);
}

.badge-icon {
    width: 26px;
    text-align: center;
}

.badge-text {
    font-size: 9px;
    line-height: 1.6;
}

.hint {
    margin-top: 16px;
    text-align: center;
}

@media (max-width: 980px) {
    .grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 520px) {
    .badges {
        grid-template-columns: 1fr;
    }
}
</style>
